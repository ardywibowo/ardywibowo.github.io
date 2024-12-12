+++
title = "Research Statement: Scaling Supervision with Intrinsic Rewards"
subtitle = ""
date = "2024-12-11T00:00:00.000Z"
summary = ""
draft = false
featured = true
authors = ["admin"]
tags = ["blog"]
categories = []
projects = []
+++

![image](intrinsic-rewards.png)

*"Intrinsic rewards are the self-supervised pretraining stage for reinforcement learning agents."*

One of the most critical challenges in training AI systems today is finding scalable supervision signals. As models grow in complexity and their applications extend into increasingly nuanced domains, providing supervision to lead them towards performing well on a task becomes more difficult. Current approaches such as Reinforcement Learning from Human Feedback (RLHF) rely heavily on feedback from humans. While effective, this process is expensive, requiring a significant investment of time and resources from domain experts.

In domains such as solving simple math or coding problems, we’ve managed to bypass the supervision bottleneck. The ability to write automated tests provides a clear, objective reward signal: the model is rewarded for producing correct outputs. However, as we push the boundaries into more complex and abstract problems—where rewards are extremely sparse—we may no longer have the luxury of such clear-cut supervision signal.

There may be multiple ways one can scalably supervise models. Simulators may eventually be sophisticated enough to provide expressive rewards, and automated reward design may become more scalable with the aid of weaker AI models.

One approach that I believe holds the most promise is designing intrinsic rewards. Instead of relying on external feedback, intrinsic rewards incentivize behaviors like curiosity (exploring novel states) or power-seeking (reaching states where the agent’s actions strongly influence outcomes). These self-motivated signals could be key to enabling models to tackle problems that are too complex, vague, or expensive for humans to evaluate directly. Intrinsic rewards are the “self-supervised pretraining” stage for reinforcement learning agents.

This is also where safety and capabilities research intersect. Designing intrinsic rewards can lead to unexpected behaviors. For example, rewarding curiosity could cause models to fixate on irrelevant behaviors (like becoming captivated by a repetitive or meaningless state), while rewarding power-seeking might lead to behaviors that conflict with human values. To avoid such pitfalls, new intrinsic reward formulations must be developed—ones capable of mathematically encoding abstract human concepts like care or kindness. For instance, care and kindness might be defined as rewarding states that empower other agents. These advances would align model goals with the collective human good.

We’re already seeing early signs of success of intrinsic rewards in math-focused language models. By rewarding behaviors that push the model toward unexplored states, researchers have improved their ability to solve difficult problems. As challenges grow beyond the reach of traditional reward mechanisms, research into intrinsic rewards is likely to become a cornerstone of reinforcement learning.

# Addendum

I am lead to this research direction based on a number of factors. While you can easily find literature supporting this conclusion, I want to highlight the less traditional sources that left clues to this:

- Hyung Won Chung expressed that, “you shouldn’t teach the model, you should instead incentivize the model”.
- Noam Brown stated that, “You just need to make the models think for longer”.
- Dario Amodei recounts that Ilya was asking him whether he had a mathematical definition for kindness.
- DeepSeek’s new math proof model uses curiosity as an intrinsic reward signal. DeepSeek is the first organization outside of OpenAI to create a model that seems to exhibit long form reasoning.
