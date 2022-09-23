+++
date = "2016-12-03T12:00:00"
draft = false
tags = ["freelance"]
title = "Visual Saliency Test"
math = true
summary = """
I recently helped my friend with testing Federico Perazzi's saliency filters. [[Code + Paper](https://graphics.ethz.ch/~perazzif/saliency_filters/)]. 
"""

[header]
image = "saliency-results.png"
caption = "Saliency Filter Results using Federico Perazzi's method"

+++

My friend had recently asked me to help him with benchmarking this visual saliency method. I thought that the results were cool and decided to post it here. [The project page with code + paper is here](https://graphics.ethz.ch/~perazzif/saliency_filters/). 

![Federico Image Saliency Results ](/saliency-results.png)

From my understanding, visual saliency captures the subjective "attention" that a human would have when shown a certain picture. For example, we are attracted towards more "foreground" objects rather than background objects, objects that have stark contrasts, sharp textures, etc. Briefly reading the paper, Perazzi achieves this by constructing a "uniqueness" measure on each section in the entire image. Sections/superpixels are divided with K-means clustering. Pretty neat.
