---
abstract: 'Information Retrieval (IR) systems used in search and recommendation platforms frequently employ Learning-to-Rank (LTR) models to rank items in response to user queries. These models heavily rely on features derived from user interactions, such as clicks and engagement data. This dependence introduces cold start issues for items lacking user engagement and poses challenges in adapting to non-stationary shifts in user behavior over time. We address both challenges holistically as an online learning problem and propose BayesCNS, a Bayesian approach designed to handle cold start and non-stationary distribution shifts in search systems at scale. BayesCNS achieves this by estimating prior distributions for user-item interactions, which are continuously updated with new user interactions gathered online. This online learning procedure is guided by a ranker model, enabling efficient exploration of relevant items using contextual information provided by the ranker. We successfully deployed BayesCNS in a large-scale search system and demonstrated its efficacy through comprehensive offline and online experiments. Notably, an online A/B experiment showed a 10.60% increase in new item interactions and a 1.05% improvement in overall success metrics over the existing production baseline.'
url_pdf: https://arxiv.org/abs/2410.02126
title: "BayesCNS: A Unified Bayesian Approach to Address Cold Start and Non-Stationarity in Search Systems at Scale"
publication_types:
  - "1"
authors:
  - admin
  - Rakesh Sunki
  - Lucy Kuo
  - Sankalp Nayak
summary: ""
url_dataset: ""
url_project: ""
publication_short: AAAI 2025
url_source: ""
url_video: ""
author_notes: []
doi: ""
publication: AAAI 2025
featured: false
tags: []
projects: []
image:
  caption: BayesCNS Architecture
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2024-12-09T00:00:00.000Z
url_slides: ""
publishDate: 2024-12-09T00:00:00.000Z
url_poster: ""
url_code: ""
---