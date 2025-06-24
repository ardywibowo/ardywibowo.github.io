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

Scaling single-threaded model generation will end. We will hit context length limits and reach issues with context window pollution. The next frontier is multi-agent systems, under the guise of context management, multi-threaded models, or emergent coordination protocols.

During grad school, I worked on foundational problems in machine learning, particularly around approximate Bayesian inference and the use of neural networks for variational methods. My focus at the time was data efficiency: understanding how much one could learn from a given sample size.

Over time, I began to notice a broader trend: simply scaling compute, training larger models on bigger datasets for longer, yielded dramatic improvements. I saw this across domains. In time series forecasting, for example, High Frequency Trading firms achieve better price predictions by throwing more compute at model training. In my current work on search and recommender systems, we observe clear scaling laws: model performance improves consistently with more data and larger parameter counts. And, of course, we now see this scaling behavior with language models as well.

I’ve become convinced that the most important research question today is: what are the remaining axes we have yet to scale?

Reinforcement Learning (RL), for example, represents an attempt to scale along two underexplored directions. First, data. We're approaching the limits of high-quality internet-scale data. RL introduces rollout-based synthetic data generation, offering a new supply of training experiences. Second, test-time compute. RL enables models to learn to allocate more compute during inference by performing a form of search or deliberation.

But what happens after we exhaust these avenues? I believe the next major shift will be toward multi-threaded or multi-agent systems. Today’s models are fundamentally single-threaded: a single generator processes a bounded context to produce tokens sequentially. While there have been advances in extending context windows, quadratic attention costs will eventually cap that scalability. Additionally, larger contexts increase the risk of “context pollution”—models can become distracted or misled by irrelevant tokens.

By contrast, parallel generation is relatively straightforward. A model could even process parts of the input in parallel while responding. One promising area for multi-threaded intelligence is streaming multimodal models. Basic multimodal systems treat inputs and outputs as flowing through a shared context. But we could imagine parallel threads—one processing audio or video inputs in real time, another generating outputs in response. This opens up fundamental research questions:

- What’s the right interaction model for multiple threads?
- What should be exchanged in latent space versus token space?
- How can we structure token-space communication between threads?

More broadly: How should we design interaction protocols between multiple threads or agents? Is there a more fundamental compositional primitive beyond prompt-engineered role assignments and structured scaffolding? Can we discover simpler, emergent coordination mechanisms?

These are some of the most exciting and underexplored frontiers in scaling intelligence—beyond single-threaded inference, toward a richer, more dynamic model of computation.
