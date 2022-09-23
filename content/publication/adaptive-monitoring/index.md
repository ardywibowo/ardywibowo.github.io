---
abstract: 'In many machine learning tasks, input features with varying degrees of predictive capability are acquired at varying costs. In order to optimize the performance-cost trade-off, one would select features to observe a priori. However, given the changing context with previous observations, the subset of predictive features to select may change dynamically. Therefore, we face the challenging new problem of foresight dynamic selection (FDS): finding a dynamic and light-weight policy to decide which features to observe next, before actually observing them, for overall performance-cost trade-offs. To tackle FDS, this paper proposes a  Bayesian learning framework of Variational Foresight Dynamic Selection (VFDS). VFDS learns a policy that selects the next feature subset to observe, by optimizing a variational Bayesian objective that characterizes the trade-off between model performance and feature cost. At its core is an implicit variational distribution on binary gates that are dependent on previous observations, which will select the next subset of features to observe. We apply VFDS on the Human Activity Recognition (HAR) task where the performance-cost trade-off is critical in its practice. Extensive results demonstrate that VFDS selects different features under changing contexts, notably saving sensory costs while maintaining or improving the HAR accuracy. Moreover, the features that VFDS dynamically select are shown to be interpretable and associated with the different activity types. We will release the code.'
url_pdf: https://openreview.net/pdf?id=mPmCP2CXc7p
title: "VFDS: Variational Foresight Dynamic Selection in Bayesian Neural Networks"
publication_types:
  - "3"
authors:
  - admin
  - Shahin Boluki
  - Zhangyang Wang
  - Bobak Mortazavi
  - Shuai Huang
  - Xiaoning Qian
summary: ""
url_dataset: ""
url_project: ""
publication_short: AISTATS 2022
url_source: ""
url_video: ""
author_notes: []
doi: ""
publication: AISTATS 2022
featured: true
tags: []
projects: []
image:
  caption: Dynamic Feature Selection Architecture
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2020-11-21T00:00:00.000Z
url_slides: ""
publishDate: 2017-01-01T00:00:00.000Z
url_poster: ""
url_code: https://openreview.net/forum?id=mPmCP2CXc7p
---
