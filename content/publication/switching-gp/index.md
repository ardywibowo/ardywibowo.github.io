---
abstract: >-
  Emerging wearable sensors have enabled the unprecedented ability to continuously monitor human activities for healthcare purposes. However, with so many ambient sensors collecting different measurements, it becomes important not only to maintain good monitoring accuracy, but also low power consumption to ensure sustainable monitoring. This power-efficient sensing scheme can be achieved by deciding which group of sensors to use at a given time, requiring an accurate characterization of the trade-off between sensor energy usage and the uncertainty in ignoring certain sensor signals while monitor-ing. To address this challenge in the context of activity monitoring, we have designed an adaptive activity monitoring framework. We first propose a switching Gaussian process to model the observed sensor signals emitting from the underlying activity states. To efficiently compute the Gaussian process model likelihood and quantify the context prediction uncertainty, we propose a block circulant embedding technique and use Fast Fourier Transforms (FFT) for inference. By computing the Bayesian loss function tailored to switching Gaussian processes, an adaptive monitoring procedure is developed to select features from available sensors that optimize the trade-off between sensor power consumption and the prediction performance quantified by state prediction entropy. We demonstrate the effectiveness of our framework on the popular benchmark of UCI Human Activity Recognition using Smartphones.
slides: ""
publication_types:
  - "1"
authors:
  - admin
  - Guang Zhao
  - Zhangyang Wang
  - Bobak Mortazavi
  - Shuai Huang
  - Xiaoning Qian
author_notes: []
publication: In The 22nd International Conference on Artificial Intelligence and Statistics
summary: ""
publication_short: In AISTATS
title: >-
  Adaptive Activity Monitoring with Uncertainty Quantification in Switching Gaussian Process Models
doi: ""
featured: false
tags: []
projects: []
image:
  caption: First order SAR model
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2019-04-11T00:00:00.000Z
publishDate: 2017-01-01T00:00:00.000Z
url_dataset: ""
url_project: ""
url_pdf: "http://proceedings.mlr.press/v89/ardywibowo19a/ardywibowo19a.pdf"
url_slides: ""
url_poster: ""
url_code: "https://github.com/ardywibowo/SwitchingGP"
url_source: ""
url_video: ""
---
