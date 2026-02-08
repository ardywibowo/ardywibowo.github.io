+++
title = "Distill Capabilities Showcase"
subtitle = "Current theme + Distill-like writing features"
date = "2026-02-08T00:00:00Z"
summary = "Demo page showing Distill-like capabilities in the native Wowchemy article layout."
draft = true
featured = true
authors = ["admin"]
tags = ["blog", "distill", "demo"]
categories = ["demo"]
projects = []
images = ["state1.png"]

listrender = false
toc = true
doi = "10.23915/distill.demo.2026"

[distill]
  [[distill.authors]]
  author = "Randy Ardywibowo"
  authorURL = "/authors/admin/"

    [[distill.authors.affiliations]]
    name = "Apple"
    url = "https://www.apple.com"

  [[distill.authors]]
  author = "Guest Collaborator"
  authorURL = "https://example.com"

    [[distill.authors.affiliations]]
    name = "Distill Demo Lab"
    url = "https://distill.pub"

[[references]]
id = "kipf2017semi"
authors = "Kipf, T. N. and Welling, M."
title = "Semi-Supervised Classification with Graph Convolutional Networks"
year = "2017"
venue = "ICLR"
url = "https://arxiv.org/abs/1609.02907"

[[references]]
id = "velickovic2018graph"
authors = "Velickovic, P. et al."
title = "Graph Attention Networks"
year = "2018"
venue = "ICLR"
url = "https://arxiv.org/abs/1710.10903"

[[references]]
id = "gilmer2017neural"
authors = "Gilmer, J. et al."
title = "Neural Message Passing for Quantum Chemistry"
year = "2017"
venue = "ICML"
url = "https://arxiv.org/abs/1704.01212"
+++

This article demonstrates how to keep the current site theme while adding Distill-like capabilities for richer technical posts.

## Why This Page Exists

This page is meant to be a practical reference for future writing. It combines long-form narrative, mathematical notation, citations {{<cite key="kipf2017semi">}}, footnotes{{<footnote>}}Inline footnotes appear on hover/focus and work in the native theme.{{</footnote>}}, and interactive figures.

The goal is to keep a single post format that scales from quick notes to full technical deep-dives.

## Capabilities Included

### Math

Inline math works, e.g. {{<math>}}\nabla_\theta \mathcal{L}(\theta){{</math>}}.

Block math works too:

{{<math block="true">}}
\mathcal{L} = \sum_{i=1}^{N} \left(y_i - f_\theta(x_i)\right)^2 + \lambda ||\theta||_2^2
{{</math>}}

### Citations

Citations are numeric and link to references, e.g. attention-based graph methods {{<cite key="velickovic2018graph">}}.

### Code

Regular fenced code:

```python
def smooth_curve(y, alpha=0.9):
    out = [y[0]]
    for v in y[1:]:
        out.append(alpha * out[-1] + (1 - alpha) * v)
    return out
```

Shortcode-based code block:

{{<code language="python" block="true">}}
import numpy as np

def smooth_curve(y, alpha=0.9):
    out = [y[0]]
    for v in y[1:]:
        out.append(alpha * out[-1] + (1 - alpha) * v)
    return np.array(out)
{{</code>}}

## Media and Layout

### Images

{{< figure src="state1.png" class="l-body" caption="Standard body-width figure (`l-body`)." >}}

{{< figure src="scaling_size.png" class="l-page" caption="Page-width figure (`l-page`) that breaks out wider than body text." >}}

{{< figure src="state1.png" class="l-screen-inset" caption="Near full-width figure (`l-screen-inset`) for immersive visuals." >}}

### Tables

| Setting | Value | Note |
|---|---:|---|
| Context length | 8k | Standard run |
| Batch size | 128 | Mixed precision |
| Learning rate | 3e-4 | Cosine schedule |

## Interactive Figure

The interactive chart below is rendered with Vega and can be inspected directly in the browser.

{{<vega id="distill-demo-vega" spec="training_curve.vg.json" class="l-page" caption="Interactive Vega chart rendered in a page-width container." >}}

## Narrative Section Example

A Distill-style article is strongest when each section develops one core idea, then anchors it with evidence and visual intuition. For example, graph neural networks can aggregate neighborhood information through repeated message passing {{<cite key="gilmer2017neural">}}.

You can also mix in standard HTML where helpful:

<aside>
This is a side note block. It is useful for context that should not interrupt the primary flow.
</aside>

## Conclusion

This demo can be copied as a starting template for future posts. Keep the native theme, then add richer blocks only where needed.
