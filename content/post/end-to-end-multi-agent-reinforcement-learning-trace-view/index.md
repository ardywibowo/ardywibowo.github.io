+++
title = "End-to-End Multi-Agent Reinforcement Learning"
subtitle = "An entire multi-agent trace is one RL sample."
date = "2026-07-10T00:00:00.000Z"
summary = "A trace-level view of reinforcement learning for multi-agent, tool-using, and compacted language-model systems."
draft = false
featured = false
authors = ["admin"]
tags = ["blog", "reinforcement-learning", "agents"]
categories = []
projects = []
images = []
toc = true
+++

Reinforcement Learning (RL) frameworks for language models often assume one rollout consists of one sequence. The model consecutively interacts with an environment by repeatedly receiving prompts and producing completions. Throughout this process, it receives a reward or rewards to update the model. This is the simplest possible interface, and for many RLHF or RLVR settings it is enough.

But it is not the right abstraction for long-running tasks that involve multiple agents and compaction. Indeed, agents can interact with sub-agents, collaborate and debate with other agents, and compact continuations. In this setting, the rollout no longer involves a single sequence. Some of these sequences may share context. Others may be completely independent token streams. The final outcome is a property of the whole run.

In the following, I will describe a good model for reasoning about these multi-agent trajectories, how to jointly train multiple agents, and why compaction is a special case of the same abstraction. I will then show that little needs to change to support this multi-agent joint training paradigm.

## Sequences and Traces

A sequence is one model-generated stream of tokens. Write it as

{{< math block=true >}}
s_i
=
(y_{i,1},\ldots,y_{i,T_i}).
{{< /math >}}

The sequence is generated under some local context {{< math >}}h_i{{< /math >}}:

{{< math block=true >}}
y_{i,t}
\sim
\pi_\theta(\cdot \mid h_i, y_{i,<t}).
{{< /math >}}

In a simple chat setting, there may only be one such sequence. But in a real agent harness, there may be many:

{{< math block=true >}}
\tau
=
\{s_1,\ldots,s_n\}.
{{< /math >}}

I will call this whole object a trace. The trace is the full execution of the harness: every model-generated sequence that contributed to the run, together with the environment state that connected them. Without loss of generality, we will assume outcome rewards {{< math >}}R(\tau){{< /math >}} are provided to the trace {{< math >}}\tau{{< /math >}}. The following formulations will hold for token-level rewards as well.

## Policy Gradients for Multiple Agents

The harness decides which agents are called, what tools they can use, when context is compacted, whether another agent is asked to critique the answer, and when the run terminates. It also decides what information is visible to each generated sequence. It is therefore useful to write the trace distribution as

{{< math block=true >}}
\tau
\sim
H(\pi_\theta),
{{< /math >}}

where {{< math >}}H{{< /math >}} is the harness. The harness may be a simple chat loop, but it may also be a large program involving many model calls, external tools, and state transitions. The Reinforcement Learning objective is thus:

{{< math block=true >}}
\max_\theta
\;
\mathbb{E}_{\tau \sim H(\pi_\theta)}
\left[
R(\tau)
\right].
{{< /math >}}

The only difference is that the sample {{< math >}}\tau{{< /math >}} is no longer assumed to be one contiguous sequence. It is the whole trace emitted by the harness.

To see the gradient explicitly, first consider the case where every generated sequence comes from the same policy {{< math >}}\pi_\theta{{< /math >}}. If the trace contains generated sequences {{< math >}}s_1,\ldots,s_n{{< /math >}}, then the model-dependent part of the trace log-probability is the sum of the log-probabilities of the generated tokens:

{{< math block=true >}}
\log \pi_\theta(\tau)
=
\sum_{i=1}^{n}
\sum_{t=1}^{T_i}
\log \pi_\theta
\left(
y_{i,t}
\mid
h_i, y_{i,<t}
\right)
+ \text{terms independent of } \theta.
{{< /math >}}

So the policy-gradient update is

{{< math block=true >}}
g
=
\mathbb{E}_{\tau}
\left[
A(\tau)
\sum_{i=1}^{n}
\sum_{t=1}^{T_i}
\nabla_\theta
\log \pi_\theta
\left(
y_{i,t}
\mid
h_i, y_{i,<t}
\right)
\right].
{{< /math >}}

This gives us a minimal algorithm implementation. Run the whole harness, collect every generated sequence in the trace, compute a trace-level reward or advantage, and apply that uniform reward to all trained tokens in the trace. This simple credit assignment method is unbiased. More careful credit assignment can come later, but note that it will only serve as variance reduction.

## Compaction as a Special Case

With this, we can see compaction as a special case of the above formulation. Before compaction, the model may have generated a long context:

{{< math block=true >}}
s_1
=
(y_{1,1},\ldots,y_{1,T_1}).
{{< /math >}}

After compaction, the harness replaces the old context with a compressed state and continues:

{{< math block=true >}}
h_2
=
C(h_1, s_1),
\qquad
s_2
\sim
\pi_\theta(\cdot \mid h_2).
{{< /math >}}

The second sequence may not share a token prefix with the first. In fact, it usually should not: the whole point of compaction is to replace the old transcript with a shorter representation. But this does not create a new RL problem. The pre-compaction sequence and the post-compaction sequence still belong to the same trace if the final outcome is assigned to the whole run:

{{< math block=true >}}
\tau
=
\{s_1, s_2\}.
{{< /math >}}

So compaction is just a sequence boundary. It breaks the assumption that a rollout can be represented as one prefix-growing transcript, but it does not break trace-level training. Thus, we can view compaction as a special case of multi-agent training. A compacted continuation behaves like a new local agent invocation: it sees a different context, emits a new token stream, and contributes to the same final outcome.

## Multi-Turn RL and Shared Prefixes

In ordinary multi-turn conversations, later model calls often contain earlier calls as exact token prefixes. For example:

{{< math block=true >}}
\begin{aligned}
s_1
&=
\text{prompt} + \text{answer}_1,
\\
s_2
&=
\underbrace{\text{prompt} + \text{answer}_1}_{\text{shared prefix}}
+
\text{observation}_1
+
\text{answer}_2.
\end{aligned}
{{< /math >}}

If {{< math >}}s_1{{< /math >}} is an exact prefix of {{< math >}}s_2{{< /math >}}, we can reuse the shared prefix computation and represent them as one longer training sequence while preserving labels for both generated spans. This avoids redundant computation on the shared prefix. In cases where the model's sequence construction is not prefix stable, for example on models whose chat templates remove specific blocks such as thinking to preserve context length, one can fall back to the previous multi-agent formulation above and keep the sequences separate.

## Conclusion

We started by separating sequences from traces. A sequence is one model-generated token stream, while a trace is the full execution of the harness. The reward is attached to the trace, not necessarily to any single sequence. From this view, the policy gradient is still the usual policy gradient. The only change is that the score term sums over every trainable generated token in every sequence in the trace. This gives a simple unbiased estimator for multi-turn, multi-agent, tool-using, and compacted executions.
