+++
title = "On the Optimal Teacher for On-Policy (Self-)Distillation"
subtitle = "A Good Teacher Meets the Student Where They Are"
date = "2026-07-09T00:00:00.000Z"
summary = "A short derivation of the teacher objective induced by asking OPD to match a plain RL policy-gradient update."
draft = false
featured = false
authors = ["admin"]
tags = ["blog", "reinforcement-learning"]
categories = []
projects = []
images = []
toc = true
+++

On-policy distillation has become an attractive way to post-train language models. Unlike RL approaches that use sparse outcome rewards, OPD provides dense supervision along the student's own trajectories, which can enable greater sample and compute efficiency.

Recently On-Policy Self-Distillation (OPSD) has become especially appealing. Instead of requiring a stronger teacher, one can use the same base model as both the student and the teacher. While the student policy is only given the default task environment, the teacher is provided with privileged information. This privileged information can come in the form of hints, feedback, verifier traces, or reference-side context.

The hope of OPSD is that this privileged information is enough to create a strong teacher for the student to imitate. In the following, we will derive the optimal form that this teacher would take.

## The Optimal Teacher Setting

It is difficult to say anything theoretical on techniques that merely prompt models. We therefore consider a cleaner formulation where we can train a policy to behave as an optimal teacher for a given student.

Let the student policy be

{{< math block=true >}}
\pi_S(\tau \mid x),
{{< /math >}}

and let the teacher policy be

{{< math block=true >}}
\pi_T(\tau \mid x,c).
{{< /math >}}

Here {{< math >}}x{{< /math >}} is the task input, {{< math >}}c{{< /math >}} is privileged information available only to the teacher during training, and {{< math >}}\tau{{< /math >}} is a trajectory. The object we want to characterize is the optimal teacher,

{{< math block=true >}}
\pi_T^\star(\tau \mid x,c).
{{< /math >}}

## The OPD Optimality Condition

The student update induced by OPD is determined by the teacher-student log-ratio. For a fixed student {{< math >}}\pi_S{{< /math >}}, OPD gives the policy-gradient direction

{{< math block=true >}}
g_{\mathrm{OPD}}
=
\mathbb{E}_{\tau \sim \pi_S(\cdot \mid x)}
\left[
\left(
\log \pi_T(\tau \mid x,c)
-
\log \pi_S(\tau \mid x)
\right)
\nabla \log \pi_S(\tau \mid x)
\right].
{{< /math >}}

The corresponding plain RL update is

{{< math block=true >}}
g_{\mathrm{RL}}
=
\frac{1}{\beta}
\mathbb{E}_{\tau \sim \pi_S(\cdot \mid x)}
\left[
A^\star(x,\tau)
\nabla \log \pi_S(\tau \mid x)
\right].
{{< /math >}}

So, if we define the optimal teacher as the teacher whose OPD update exactly matches the RL update, the necessary and sufficient condition is

{{< math block=true >}}
\boxed{
\mathbb{E}_{\tau \sim \pi_S(\cdot \mid x)}
\left[
\left(
\log \pi_T^\star(\tau \mid x,c)
-
\log \pi_S(\tau \mid x)
-
\frac{1}{\beta}A^\star(x,\tau)
\right)
\nabla \log \pi_S(\tau \mid x)
\right]
=
0.
}
{{< /math >}}

This is the exact condition. It only requires equality after projection onto the student score function.

## A Pointwise Sufficient Teacher

It suffices to satisfy the stronger pointwise condition

{{< math block=true >}}
\log \pi_T^\star(\tau \mid x,c)
-
\log \pi_S(\tau \mid x)
=
\frac{1}{\beta}A^\star(x,\tau)
-
\log Z(x,c).
{{< /math >}}

The constant {{< math >}}\log Z(x,c){{< /math >}} does not affect the policy-gradient update because

{{< math block=true >}}
\mathbb{E}_{\tau \sim \pi_S}
\left[
\nabla \log \pi_S(\tau \mid x)
\right]
=
0.
{{< /math >}}

Exponentiating gives

{{< math block=true >}}
\pi_T^\star(\tau \mid x,c)
=
\frac{
\pi_S(\tau \mid x)
\exp\left(A^\star(x,\tau)/\beta\right)
}{
Z(x,c)
}.
{{< /math >}}

So the pointwise construction gives one clean optimal teacher: the student distribution exponentially tilted toward high-advantage trajectories.

## Training Toward The Optimal Teacher

Now we ask how to train a teacher toward this pointwise optimal form.

Take any candidate teacher {{< math >}}\pi_T{{< /math >}}. Since the target distribution {{< math >}}\pi_T^\star{{< /math >}} is now defined, the most direct objective is to minimize the distance from the candidate teacher to the optimal teacher:

{{< math block=true >}}
\min_{\pi_T}
\mathrm{KL}
\left(
\pi_T(\cdot \mid x,c)
\;\|\;
\pi_T^\star(\cdot \mid x,c)
\right).
{{< /math >}}

Expanding this KL gives the teacher-training objective

{{< math block=true >}}
\boxed{
\max_{\pi_T}
\;
\mathbb{E}_{\tau \sim \pi_T}
\left[
A^\star(x,\tau)
\right]
-
\beta
\mathrm{KL}
\left(
\pi_T(\cdot \mid x,c)
\;\|\;
\pi_S(\cdot \mid x)
\right).
}
{{< /math >}}

The above objective indicates that the optimal teacher should not simply maximize reward. It should maximize reward while staying close to the student distribution.

This gives a precise form to the intuition behind pedagogical teaching: the teacher should only move away from the student when the advantage is large enough to justify that movement. High-reward trajectories are useful only insofar as they can be connected back to the student's current policy. In this view, the teacher-student KL is not an extra regularizer added after the fact; it is the cost of producing a learning signal that remains compatible with OPD.

## A Practical Algorithm

The above objective suggests an iterative algorithm: alternately train the teacher and the student until convergence.

At iteration {{< math >}}k{{< /math >}}, freeze the current student {{< math >}}\pi_S^{(k)}{{< /math >}} and train a privileged teacher against it:

{{< math block=true >}}
\pi_T^{(k+1)}
\leftarrow
\arg\max_{\pi_T}
\;
\mathbb{E}_{\tau \sim \pi_T(\cdot \mid x,c)}
\left[
\widehat{A}(x,\tau)
\right]
-
\beta
\mathrm{KL}
\left(
\pi_T(\cdot \mid x,c)
\;\|\;
\pi_S^{(k)}(\cdot \mid x)
\right).
{{< /math >}}

Here {{< math >}}\widehat{A}(x,\tau){{< /math >}} is whatever practical advantage estimate is available. For example, it could be a centered verifier reward.

Then freeze the teacher and update the student using the OPD signal induced by that teacher:

{{< math block=true >}}
w^{(k)}(\tau)
=
\log \pi_T^{(k+1)}(\tau \mid x,c)
-
\log \pi_S^{(k)}(\tau \mid x).
{{< /math >}}

The student policy is then updated in the policy-gradient direction

{{< math block=true >}}
g_S^{(k)}
=
\mathbb{E}_{\tau \sim \pi_S^{(k)}(\cdot \mid x)}
\left[
w^{(k)}(\tau)
\nabla \log \pi_S^{(k)}(\tau \mid x)
\right].
{{< /math >}}

In pseudocode:

<div class="algorithm-box">

<div class="algorithm-title">Algorithm: Alternating Teacher-Student OPD</div>
<div class="algorithm-meta"><strong>Require:</strong> Initial student {{< math >}}\pi_S^{(0)}{{< /math >}}, privileged context {{< math >}}c{{< /math >}}, advantage estimator {{< math >}}\widehat{A}{{< /math >}}, KL weight {{< math >}}\beta{{< /math >}}.</div>
<div class="algorithm-meta"><strong>Return:</strong> Student policy {{< math >}}\pi_S{{< /math >}}.</div>

1. For {{< math >}}k = 0,1,2,\ldots{{< /math >}}:
   1. Freeze {{< math >}}\pi_S^{(k)}{{< /math >}}.
   2. Train a privileged teacher {{< math >}}\pi_T^{(k+1)}(\tau \mid x,c){{< /math >}} with reward minus teacher-student KL.
   3. Freeze {{< math >}}\pi_T^{(k+1)}{{< /math >}}.
   4. Roll out trajectories from {{< math >}}\pi_S^{(k)}(\tau \mid x){{< /math >}}.
   5. Update the student with the OPD log-ratio signal {{< math >}}\log \pi_T^{(k+1)} - \log \pi_S^{(k)}{{< /math >}}.
   6. Set the result to {{< math >}}\pi_S^{(k+1)}{{< /math >}} and repeat.

</div>

At convergence, the teacher should no longer need to move far from the student to produce high-advantage trajectories. In that sense, the student has absorbed the part of the privileged teacher that is useful under the original task environment.
