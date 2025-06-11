+++
title = "The End of Single-Threaded Intelligence"
subtitle = ""
date = "2025-06-10T00:00:00.000Z"
summary = ""
draft = false
featured = true
authors = ["admin"]
tags = ["research_statement"]
categories = []
projects = []
images = ["single-threaded.png"]
+++

![image](single-threaded.png)

In grad school I was working on fundamental machine learning relating to approximate Bayesian inference, such as using neural networks for variational inference. at the time, I was very interested in data efficiency: how much can you learn with a given sample size.

More and more I noticed that simply scaling compute through training bigger models, on big datasets for longer resulted in amazing capabilities. When I worked on time series, I noticed the same phenomena. It is the case that High Frequency Trading firms rely on scaling up model training compute for better price prediction models. In the area I’m currently working on, which is search & recommender systems, we’re seeing a clear scaling law where performance gets better with more data and parameters. We’re also seeing this now with language models but it also applies to other areas as well.

I’m completely convinced that the most important research now is to figure out what axes we have yet to scale.

For example, the recent interest in Reinforcement Learning is an effort by the field to further scale on two directions.

One is data. It is no surprise that we’ve currently run out of quality internet data. The rollout process in RL can be thought of as a synthetic data generation method.

The other is in single-threaded test time compute. I’ll explain what I mean by single-threaded in a moment, but essentially, RL allows models to learn to leverage more compute during test time and do a limited form of search.

So what are the remaining axes that we’ve yet to scale? I think RL will take us very far, but I think the next scaling paradigm might be multi-threaded or multi-agent systems. As an analogy, current systems are entirely single-threaded: A single generator processes a limited context window to generate new tokens. While there have been breakthroughs in increasing the context-window, it’s only a matter of time before the quadratic attention costs catch up to us and we’re unable to scale single-threaded test-time compute further. Moreover, context pollution becomes a potential issue. Models may not be able to reliably use the entire context and may get distracted on spurious tokens within it.

On the other hand, generating completions in parallel is relatively trivial. Models can even pre-process inputs in parallel while it’s responding, an idea brought up in the sleep-time compute paper.

One area where this paradigm might be applied is with streaming multimodal models. Simple multimodal models all read from and write to the same context. One can envision that separate threads can be run simultaneously, where one thread would observe video or audio inputs while another would respond to these observations. There are many interesting research questions to pursue here: What’s the right form where these multiple threads interact? Which parts should be in latent space, and which parts should be in token space? How do interactions between threads in token space happen? How should we design this interaction protocol?

More generally, how should we design the interaction protocol for multiple threads/agents working together? Is there a fundamental primitive in which we can combine outputs from different streams? Can we do away with the complicated structures in which we prescribe how different agents interact (currently we do heavy prompt engineering and assign different roles to agents).
