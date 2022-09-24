---
abstract: 'Continual Learning (CL) is the problem of sequentially learning a set of tasks and preserving all the knowledge acquired. Many existing methods assume that the data stream is explicitly divided into a sequence of known contexts (tasks), and use this information to know when to transfer knowledge from one context to another. Unfortunately, many real-world CL scenarios have no clear task nor context boundaries, motivating the study of task-agnostic CL, where neither the specific tasks nor their switches are known both in training and testing. This paper proposes a variational architecture growing framework dubbed VariGrow. By interpreting dynamically growing neural networks as a Bayesian approximation, and defining flexible implicit variational distributions, VariGrow detects if a new task is arriving through an energy-based novelty score. If the novelty score is high and the sample is “detected" as a new task, VariGrow will grow a new expert module to be responsible for it. Otherwise, the sample will be assigned to one of the existing experts who is most “familiar" with it (i.e., one with the lowest novelty score). We have tested VariGrow on several CIFAR and ImageNet-based benchmarks for the strict task-agnostic CL setting and demonstrate its consistent superior performance. Perhaps surprisingly, its performance can even be competitive compared to task-aware methods.'
url_pdf: https://proceedings.mlr.press/v162/ardywibowo22a.html
title: "VariGrow: Variational Architecture Growing for Task-Agnostic Continual Learning based on Bayesian Novelty"
publication_types:
  - "3"
authors:
  - admin
  - Zepeng Huo
  - Zhangyang Wang
  - Bobak Mortazavi
  - Shuai Huang
  - Xiaoning Qian
summary: ""
url_dataset: ""
url_project: ""
publication_short: ICML 2022
url_source: ""
url_video: ""
author_notes: []
doi: ""
publication: ICML 2022
featured: true
tags: []
projects: []
image:
  caption: Variational growing architecture
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2022-07-21T00:00:00.000Z
url_slides: ""
publishDate: 2022-07-21T00:00:00.000Z
url_poster: ""
url_code: ""
---
