---
title: Bayesian Methods in Continual Learning

event: AstraZeneca Talk
event_url:

location: Virtual
# address:
#   street: 450 Serra Mall
#   city: Stanford
#   region: CA
#   postcode: '94305'
#   country: United States

summary: I gave a talk on Continual Learning to AstraZeneca.
abstract: "Continual Learning (CL) is the problem of sequentially learning predictive models with varying data that may originate from different contexts. Many existing CL methods assume that the data stream is divided into a sequence of contexts, termed as tasks, with explicitly given transition boundaries. Unfortunately, many real-world CL scenarios have neither explicit task information nor context boundaries, motivating the study of task-agnostic CL. This paper proposes a variational architecture growing framework dubbed VariGrow. By interpreting dynamically growing neural networks as a Bayesian approximation, and defining flexible implicit variational distributions, VariGrow detects if a new task is arriving through an energy-based novelty score. If the novelty score is high and the sample is “detected” as a new task, VariGrow will grow a new expert module to be responsible for it. Otherwise, the sample will be assigned to one of the existing experts who is the most “familiar” with it (i.e., one with the lowest novelty score) to preserve all the acquired knowledge. We have tested VariGrow on several CIFAR and ImageNet-based benchmarks for the strictly task-agnostic CL setting without any task information during training or testing, which demonstrates its consistently superior or competitive performance."

# Talk start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
date: "2022-07-05T13:00:00Z"
date_end: "2022-07-05T15:00:00Z"
all_day: false

# Schedule page publish date (NOT talk date).
publishDate: "2022-07-05T00:00:00Z"

authors: []
tags: []

# Is this a featured talk? (true/false)
featured: false

image:
  # caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/bzdhc5b3Bxs)'
  # focal_point: Right

links:
- icon: twitter
  icon_pack: fab
  name: Follow
  url: https://twitter.com/rendope
url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""
---

<!-- Markdown Slides (optional).
  Associate this talk with Markdown slides.
  Simply enter your slide deck's filename without extension.
  E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
  Otherwise, set `slides = ""`.
slides: example

Projects (optional).
  Associate this post with one or more of your projects.
  Simply enter your project's folder or file name without extension.
  E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
  Otherwise, set `projects = []`.
projects:
- example
---

{{% callout note %}}
Click on the **Slides** button above to view the built-in slides feature.
{{% /callout %}}

Slides can be added in a few ways:

- **Create** slides using Wowchemy's [*Slides*](https://wowchemy.com/docs/managing-content/#create-slides) feature and link using `slides` parameter in the front matter of the talk file
- **Upload** an existing slide deck to `static/` and link using `url_slides` parameter in the front matter of the talk file
- **Embed** your slides (e.g. Google Slides) or presentation video on this page using [shortcodes](https://wowchemy.com/docs/writing-markdown-latex/).

Further event details, including [page elements](https://wowchemy.com/docs/writing-markdown-latex/) such as image galleries, can be added to the body of this page.  -->
