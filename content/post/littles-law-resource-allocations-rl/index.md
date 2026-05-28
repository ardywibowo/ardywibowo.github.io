+++
title = "Little's Law and Resource Allocations for Reinforcement Learning"
subtitle = ""
date = "2026-05-28T00:00:00.000Z"
summary = ""
draft = false
featured = false
authors = ["admin"]
tags = ["blog", "reinforcement-learning"]
categories = []
projects = []
images = ["title-abstract-v1.svg"]
toc = true
+++

![Abstract token flow](title-abstract-v1.svg)

Reinforcement Learning (RL) consists of generating rollouts and training on them. These two systems are separate and can be largely disaggregated to improve throughput. As such, we can scale each component separately.

How should we allocate resources between training and inference? I was recently fascinated by a discrepancy I encountered between theoretical training/inference resource requirements, and actual allocations of RL training done in the open source. The common practice seems to be to allocate more compute resources to inference vs. training as long rollouts in inference heavily bottleneck the training. However, a back of the envelope accounting of the FLOPs would suggest that training would need more resources. Indeed, training requires 6 x N x D FLOPs due to the forward, activation backward, and weight backward respectively. Meanwhile, inference simply needs 2 x N x D FLOPs for just the forward pass. This would suggest that we should allocate training : inference at a 3:1 ratio.

This is simply not the case, and for good reason. It turns out that inference is severely bottlenecked by other factors: memory bandwidth, environment interactions, judging, and the sequential nature of autoregressive generation. The need for more inference workers might be justified. But what is exactly the optimal training configuration? How should we justify in what ratio the training and inference workers are deployed in? What about concerns of staleness between training weights and inference weights? What about overflows in the replay buffers? What about long rollouts stalling things? What is a good way to reason about all of this?

## Useful Simplifications

To begin shedding light on this, some useful simplifying assumptions can be made. Unfortunately, tokens aren't exactly "fungible". A sequence of tokens need to complete generation and be fed into training as a complete indivisible sequence. At first glance, this may seem to complicate things, but a result from Queueing Theory says that we can start with a simpler token-level picture. Indeed, Little's Law states the following:

{{< math block=true >}}
L = \lambda W
{{< /math >}}

where {{< math >}}L{{< /math >}} is the average number of items in the system, {{< math >}}\lambda{{< /math >}} is throughput, and {{< math >}}W{{< /math >}} is the average time an item spends in the system.

What this states is that we can reason about the number of tokens currently in the system without modeling the exact arrival pattern of every rollout. If rollout workers produce tokens at rate {{< math >}}\lambda{{< /math >}} and the trainer consumes tokens at the **same steady-state rate**, then the average number of tokens sitting in the system is just the throughput multiplied by the average time those tokens wait before training. In other words, to a first order approximation, we can reason about the number of tokens currently in the system completely in terms of the throughput of the system, and not the maximum possible sequence length that a rollout would generate.

This observation is also useful to reason about policy staleness. It turns out policy staleness is also a statement about delay. Suppose the trainer publishes a new policy every {{< math >}}T_\text{train}{{< /math >}} seconds. If we allow a sample to be at most {{< math >}}k{{< /math >}} policy versions stale, then the maximum tolerated age of a token is roughly:

{{< math block=true >}}
k T_\text{train}
{{< /math >}}

Combining this with Little's Law gives a maximum safe number of tokens currently in the system:

{{< math block=true >}}
L \leq \lambda k T_\text{train}
{{< /math >}}

But {{< math >}}\lambda T_\text{train}{{< /math >}} is exactly the number of tokens consumed per training step. If we call this training batch size {{< math >}}B_\text{train}{{< /math >}}, then:

{{< math block=true >}}
L \leq k B_\text{train}
{{< /math >}}

This is the key mental model:

**A staleness bound is a bound on in-system tokens measured in training batches.**

If {{< math >}}k = 8{{< /math >}}, then the system can safely carry about eight training batches' worth of tokens before the oldest data becomes too stale. If {{< math >}}k = 1{{< /math >}}, the system is nearly synchronous: the trainer has almost no room to absorb delays from the rollout workers.

But this in-system token bound only answers one part of the problem: how much data can sit between inference and training before it becomes too old. It does not yet answer whether the trainer is being fed fast enough in the first place. For resource allocation, we need a separate conservation condition on the flow of tokens through the system.

## Throughput Matching

Note that earlier we stated the requirement that rollout workers and the trainer operate at the **same steady-state rate**. This is actually a deep necessary condition to prevent any stalls/overflows in either the trainer or the inference workers. If training has higher throughput, it would eventually be starved of training samples because inference can't generate fast enough. If inference has higher throughput, the sample buffer would eventually overflow, samples would grow stale, and we would need to throw them away and waste compute.

The first condition is simply that inference must be able to feed the trainer. Let:

{{< math block=true >}}
\lambda_\text{infer} = \text{aggregate inference throughput}
{{< /math >}}

{{< math block=true >}}
\lambda_\text{train} = \text{trainer consumption rate}
{{< /math >}}

The effective end-to-end throughput is:

{{< math block=true >}}
\lambda_\text{effective} = \min(\lambda_\text{infer}, \lambda_\text{train})
{{< /math >}}

Buffers can smooth bursts, but they cannot change this long-run minimum. Every token trained on must first be generated. If inference produces tokens slower than training consumes them, the trainer eventually starves. If inference produces tokens faster than training consumes them, the replay buffer fills until it hits the staleness cap, at which point inference workers idle or data is discarded. So exact equality is the ideal utilization point.

## Reasoning about Policy Staleness

If the trainer publishes new weights every {{< math >}}T_\text{train}{{< /math >}} seconds, then a token that waits {{< math >}}W{{< /math >}} seconds before training is roughly:

{{< math block=true >}}
\frac{W}{T_\text{train}}
{{< /math >}}

policy versions stale. If the staleness budget is {{< math >}}k{{< /math >}}, then:

{{< math block=true >}}
W \leq k T_\text{train}
{{< /math >}}

This gives two equivalent ways of reading the same constraint:

{{< math block=true >}}
L \leq k B_\text{train}
{{< /math >}}

and:

{{< math block=true >}}
W \leq k T_\text{train}
{{< /math >}}

The first says the system can carry at most {{< math >}}k{{< /math >}} batches' worth of tokens before the oldest data becomes stale. The second says a token can wait at most {{< math >}}k{{< /math >}} training steps. These are the same statement under Little's Law.

This is also why simply adding more inference workers is not always enough. More workers increase aggregate throughput, but they do not necessarily reduce the wall-clock age of a long rollout. If a single rollout takes longer than the staleness budget permits, then the system can have plenty of aggregate inference capacity and still produce unusable data.

## What About Non-Fungible Sequences?

The token-level analysis is the clean first approximation. But real rollouts are not streams of independent tokens. They are variable-length sequences.

This changes the engineering constraints:

- Long rollouts create tail latency. The longest rollouts, not the average rollouts, determine worst-case staleness.
- Atomic rollout release creates bursts. If a 32k-token sequence is only released when complete, the buffer receives a large chunk all at once, and the earliest tokens in that sequence may already be old.
- Variable lengths create padding waste on the training side. The trainer's useful tokens/sec can be much lower than its nominal tokens/sec if batches are padded inefficiently.
- Static batching wastes inference capacity. If short sequences finish and long sequences remain, the decode batch shrinks unless the system supports continuous batching.

These issues do not invalidate the Little's Law picture. They tell us which quantities need to be measured carefully. We should use useful token throughput, the actual number of in-system tokens, per-sample staleness, and the tail of the rollout length distribution.

## Facing Reality

### The FLOP-Balanced Ideal

In the clean compute-bound world, the earlier FLOP accounting gives a simple answer. Per token, training costs about {{< math >}}6ND{{< /math >}} FLOPs and inference costs about {{< math >}}2ND{{< /math >}} FLOPs. If all workers achieve the same fraction of peak FLOPs, then training needs three times as much hardware as inference:

{{< math block=true >}}
\text{training : inference} = 3 : 1
{{< /math >}}

In that hypothetical, long rollouts do not change the asymptotic answer. With enough parallel rollout workers, enough concurrent requests, and a buffer, the chunkiness of individual rollouts is amortized away. The rollout workers generate data, the trainer consumes data, and the only thing that matters in steady state is whether the token rates match.

The long-rollout problem is not that a rollout is large. The problem is that rollout generation is often slow, variable, and indivisible at the sequence level. Those properties create burstiness and staleness pressure. They do not invalidate the first-order throughput accounting, but they change whether the idealized rates are achievable.

### Why Reality Is Inference-Heavy

The compute-bound assumption is exactly the part that fails in real RL systems.

Autoregressive inference is sequential. A single sequence advances one token at a time. Unless the inference engine has enough concurrent sequences to form large batches, it cannot efficiently use the GPU. It also needs to move model weights and KV cache through memory repeatedly, so realized throughput is often constrained by memory bandwidth rather than peak FLOPs.

Training, by contrast, is usually closer to the workload GPUs are best at: large dense matrix multiplications over fixed tensors. Forward, activation backward, and weight backward are expensive, but they are regular. They can reach much higher hardware utilization than decode-heavy inference.

This flips the observed worker allocation. The theoretical FLOP ratio says training should dominate. The realized throughput ratio can say inference should dominate. The correct allocation is therefore not set by FLOPs alone. It is set by delivered tokens/sec:

{{< math block=true >}}
\lambda_\text{infer}(n_\text{infer}) \approx \lambda_\text{train}(n_\text{train})
{{< /math >}}

where the two functions include actual utilization, memory bandwidth, rollout length, judging, environments, communication, and padding waste.

## Practical Rule of Thumb

The allocation problem can be summarized as:

{{< math block=true >}}
\max_{n_\text{infer}, n_\text{train}} \min(\lambda_\text{infer}(n_\text{infer}), \lambda_\text{train}(n_\text{train}))
{{< /math >}}

subject to:

{{< math block=true >}}
L \leq k B_\text{train}
{{< /math >}}

and enough headroom that rollout variance does not starve the trainer.

In the ideal compute-bound regime, the solution is near the 3:1 training-to-inference FLOP ratio. In the real autoregressive RL regime, the optimum often shifts toward many more inference workers because inference delivers far fewer useful tokens/sec per unit of hardware. Once inference can reliably keep up with training, additional inference capacity becomes stale-data pressure or idle time.

So the useful way to reason about RL resource allocation is:

1. Measure delivered useful tokens/sec for inference and training.
2. Allocate workers until {{< math >}}\lambda_\text{infer}{{< /math >}} slightly exceeds {{< math >}}\lambda_\text{train}{{< /math >}}.
3. Keep the number of in-system tokens below {{< math >}}k B_\text{train}{{< /math >}}.
4. Check that rollout latency and length tails fit inside {{< math >}}k T_\text{train}{{< /math >}}.
5. Use continuous batching, length-aware scheduling, streaming rollout release, and truncation to make the messy sequence-level system look closer to the clean token-flow model.

The final lesson is that resource allocation for RL is not determined by theoretical FLOPs alone. FLOPs give the ideal point. Little's Law tells us how delay becomes in-system token count. Staleness tells us how much in-system data we are allowed to carry. The optimal configuration is the point where inference feeds training fast enough, the trainer stays busy, and the samples remain young enough to train on.
