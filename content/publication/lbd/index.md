---
abstract: >-
  In this work, we propose learnable Bernoulli dropout (LBD), a new model-agnostic dropout scheme that considers the dropout rates as parameters jointly optimized with other model parameters. By probabilistic modeling of Bernoulli dropout, our method enables more robust prediction and uncertainty quantification in deep models. Especially, when combined with variational auto-encoders (VAEs), LBD enables flexible semi-implicit posterior representations, leading to new semi-implicit VAE (SIVAE) models. We solve the optimization for training with respect to the dropout parameters using Augment-REINFORCE-Merge (ARM), an unbiased and low-variance gradient estimator. Our experiments on a range of tasks show the superior performance of our approach compared with other commonly used dropout schemes. Overall, LBD leads to improved accuracy and uncertainty estimates in image classification and semantic segmentation. Moreover, using SIVAE, we can achieve state-of-the-art performance on collaborative filtering for implicit feedback on several public datasets.
slides: ""
publication_types:
  - "1"
authors:
  - Shahin Boluki
  - Randy Ardywibowo
  - Siamak Zamani Dadaneh 
  - Mingyuan Zhou
  - Xiaoning Qian
author_notes: []
publication: In International Conference on Artificial Intelligence and Statistics
summary: ""
publication_short: In AISTATS
title: >-
  Learnable Bernoulli Dropout for Bayesian Deep Learning
doi: ""
featured: false
tags: []
projects: []
image:
  caption: LBD Gradient Bias and Variance Comparison
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2020-06-03T00:00:00.000Z
publishDate: 2017-01-01T00:00:00.000Z
url_dataset: ""
url_project: ""
url_pdf: "http://proceedings.mlr.press/v108/boluki20a.html"
url_slides: ""
url_poster: ""
url_code: "https://github.com/QianLab/LBD"
url_source: ""
url_video: ""
---
