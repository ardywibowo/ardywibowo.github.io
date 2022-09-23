---
abstract: >-
  Machine learning (ML) systems often encounter Out-of-Distribution (OoD) errors when dealing with testing data coming from a distribution different from training data. It becomes important for ML systems in critical applications to accurately quantify its predictive uncertainty and screen out these anomalous inputs. However, existing OoD detection approaches are prone to errors and even sometimes assign higher likelihoods to OoD samples. Unlike standard learning tasks, there is currently no well established guiding principle for designing OoD detection architectures that can accurately quantify uncertainty. To address these problems, we first seek to identify guiding principles for designing uncertainty-aware architectures, by proposing Neural Architecture Distribution Search (NADS). NADS searches for a distribution of architectures that perform well on a given task, allowing us to identify common building blocks among all uncertainty-aware architectures. With this formulation, we are able to optimize a stochastic OoD detection objective and construct an ensemble of models to perform OoD detection. We perform multiple OoD detection experiments and observe that our NADS performs favorably, with up to 57% improvement in accuracy compared to state-of-the-art methods among 15 different testing configurations.
slides: ""
publication_types:
  - "1"
authors:
  - admin
  - Shahin Boluki
  - Xinyu Gong
  - Zhangyang Wang
  - Xiaoning Qian
author_notes: []
publication: In International Conference on Machine Learning
summary: ""
publication_short: In ICML
title: >-
  NADS: Neural Architecture Distribution Search for Uncertainty Awareness
doi: ""
featured: false
tags: []
projects: []
image:
  caption: NADS Architecture
  focal_point: ""
  preview_only: false
  filename: featured.png
date: 2020-11-21T00:00:00.000Z
publishDate: 2017-01-01T00:00:00.000Z
url_dataset: ""
url_project: ""
url_pdf: "http://proceedings.mlr.press/v119/ardywibowo20a/ardywibowo20a.pdf"
url_slides: ""
url_poster: ""
url_code: "https://github.com/ardywibowo/NADS"
url_source: ""
url_video: ""
---
