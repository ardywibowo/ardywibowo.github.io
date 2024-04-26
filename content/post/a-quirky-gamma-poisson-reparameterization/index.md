---
title: A Quirky Gamma-Poisson Reparameterization
subtitle: ""
date: 2024-04-25T00:00:00.000Z
summary: ""
draft: false
featured: true
authors:
  - admin
tags:
  - blog
categories: []
projects: []
image:
  caption: ""
  focal_point: ""
  placement: 2
  preview_only: false
---

I have recently been experimenting with Bayesian models of count data using Gamma-Poisson distributions. The objective was simple, using auxiliary features, use a neural network to predict the parameters of the Gamma distribution, and then use the Gamma distribution as a prior for the count data. The issue arises when trying to actually implement it. Any naive reparameterizations I tried, using `torch.log`, adding epsilons everywhere, normalizing the count data, etc. didn't seem to work. I needed to understand the Gamma distribution better.

First of all, documentation on Gamma distributions are messy, not only are there different reparameterizations (scale vs. rate), sometimes both parameterizations used the same symbols! Not to mention some formulas are not even correct (Looking at [this wrong reference](https://www.math.wm.edu/~leemis/chart/UDR/PDFs/Gammapoisson.pdf). Here $\alpha$ and $\beta$ should be switched).

I've finally found a good reference in [This](https://www.youtube.com/watch?v=B7pQpW6-id0) video. It explains it super clearly, and clarifies whether he's using the scale or rate parameterization, and links it to the Negative Binomial distribution. Turns out, besides using scale or rate, there's a quirky third reparameterization that I didn't know about. Let's write down the pdf of the Poisson-Gamma distribution. It's just a mixture of Poisson distributions with parameter $\lambda$ drawn from a Gamma distribution with parameters (**shape** = $\alpha$) and (**rate** = $\beta$):

$f_{Poisson}(\lambda) = \frac{e^{-\lambda}\lambda^{x}}{x!}$

$f_{Gamma}(\lambda | \alpha, \beta) = \frac{\beta^{\alpha}}{\Gamma(\alpha)}\lambda^{\alpha - 1}e^{-\beta\lambda}$

$f_{GammaPoi}(x) = \int_{0}^{\infty}{f_{Poisson}(\lambda)f_{Gamma}(\lambda | \alpha, \beta) d\lambda}$

$\quad = \int_{0}^{\infty}{\frac{e^{-\lambda}\lambda^{x}}{x!}\frac{\beta^{\alpha}}{\Gamma(\alpha)}\lambda^{\alpha - 1}e^{-\beta\lambda} d\lambda}$

$\quad = \frac{\beta^{\alpha}}{x!\Gamma(\alpha)}\int_{0}^{\infty}{\lambda^{x + \alpha - 1}e^{-(1 + \beta)\lambda} d\lambda}$

Notice here that the integral looks almost like a Gamma distribution, but with a different scale parameter. This is because the integral is a Gamma distribution with parameters (**shape** = $x + \alpha$) and (**rate** = $1 + \beta$), it's just missing a few constants. Since the integral of a pdf must be 1, we can just multiply and divide by the missing constants $\frac{\Gamma(x + \alpha)}{(1 + \beta)^{x + \alpha}}$:

$f_{GammaPoi}(x) = \frac{\beta^{\alpha}}{x!\Gamma(\alpha)}\frac{\Gamma(x + \alpha)}{(1 + \beta)^{x + \alpha}}$

Rearranging a little bit, we get:

$f_{GammaPoi}(x) = \frac{\Gamma(x + \alpha)}{x!\Gamma(\alpha)}\left(\frac{\beta}{1 + \beta}\right)^{\alpha}\left(\frac{1}{1 + \beta}\right)^{x}$

Notice that I separated the term with $\beta$ and $1 + \beta$ into two terms. I did this to show the relation to the Negative Binomial distribution. The Negative Binomial distribution is a Poisson-Gamma distribution with $\alpha = r$ and $\beta = p$. The Negative Binomial distribution is defined as:

$f_{NegBin}(x) = \frac{\Gamma(x + r)}{x!\Gamma(r)}p^{r}(1 - p)^{x}$

This is a way better reparameterization than the usual scale or rate parameterization. As we will see, it allows us to use Binary Cross Entropy, which has been heavily optimized to be very stable. So, lets parameterize it in terms of logits $z$:

$\sigma(z) = p = \frac{\beta}{1 + \beta}$

Then we can rewrite the Poisson-Gamma distribution as:

$f_{GammaPoi}(x) = \frac{\Gamma(x + \alpha)}{x!\Gamma(\alpha)}\sigma(z)^{\alpha}(1 - \sigma(z))^{x}$

Notice that the second term is just a Bernoulli distribution, with log likelihood:

$\alpha\log{\sigma(z)} + x\log{(1 - \sigma(z))}$

This looks like Binary Cross Entropy! Specifically, after further reparameterizing $\alpha$ into $\log(\alpha)$, the input logits, targets, and weights are:

- Logits: $z$
- Targets: $\frac{\alpha}{x + \alpha} = \text{Softmax}(\log(\alpha), \log(x))$
- Weights: $x + \alpha$

We can just use the Binary Cross Entropy loss function `BCEWithLogitsLoss` for half of the Poisson-Gamma likelihood computation:

$\alpha\log{\sigma(z)} + x\log{(1 - \sigma(z))}$ `= - (x + alpha) BCEWithLogitsLoss(z, alpha / (x + alpha))`

Meanwhile, the other half can just be computed using `torch.lgamma()` functions. The full Poisson-Gamma likelihood computation is:

```python
def gamma_poisson_loss(self, log_concentration, logits, value):
    eps = 1e-8
    concentration = torch.exp(log_concentration)
    
    log_value = torch.log(value + eps)
    targets = torch.softmax(
        torch.stack(
            [log_concentration, log_value], dim=-1
        ), 
        dim=-1
    )[..., 0]
    
    weights = value + concentration
    
    log_likelihood = (
        torch.lgamma(concentration + value + eps)
        - torch.lgamma(concentration + eps)
        - weights * F.binary_cross_entropy_with_logits(
            input = logits,
            target = targets,
            reduction = 'none'
        )
    )
    
    return -log_likelihood.mean()
```

It's also nice because to get the rate, we can just exponentiate the logits:

$\beta = e^{z}$

 In conclusion, we reparameterize and ask the neural network to output logits $z$ and $\log(\alpha)$ for the Poisson-Gamma distribution. We then use Binary Cross Entropy for half of the likelihood computation, and `torch.lgamma()` functions for the other half. No more exploding gradients!

-Randy
