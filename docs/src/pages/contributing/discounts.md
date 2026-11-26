---
title: Canopy API discounts
description: Earn up to $100 off Canopy API for each of three things - adding a Powered by Canopy badge, sharing what you built, or reviewing us on G2.
---

Building something with Canopy API? Tell people about it and we'll take up to $100 off your bill. {% .lead %}

---

## Ways to earn a discount

There are three ways to earn a discount. Each one can be claimed once per account, so you can earn all three.

- [Add a Powered by Canopy badge](#add-a-powered-by-canopy-badge) to your site or app
- [Share what you built](#share-what-you-built) in a case study, tutorial, or open-source project
- [Review Canopy API on G2](#review-us)

## How much you get

The amount depends on your plan at the time you claim:

| Your plan | Discount for each one |
| --- | --- |
| Premium | $100 |
| Pay as you go, with at least one successful payment | $50 |
| Pay as you go, with no payments yet | $20 |

To claim, email [support@canopyapi.co](mailto:support@canopyapi.co) from the address on your Canopy account with a link to your badge, post, or review. We'll apply the discount to your account.

---

## Add a Powered by Canopy badge

Add the badge to the footer of any public site or app that uses Canopy API, linking to `https://www.canopyapi.co`. Please keep it live while you use Canopy API.

![Powered by Canopy badge, light version](/badges/powered-by-canopy-light.svg)

```html
<a href="https://www.canopyapi.co" target="_blank" rel="sponsored noopener">
  <img
    src="https://docs.canopyapi.co/badges/powered-by-canopy-light.svg"
    alt="Powered by Canopy API"
    width="136"
    height="48"
  />
</a>
```

A dark version is available for dark footers:

![Powered by Canopy badge, dark version](/badges/powered-by-canopy-dark.svg)

```html
<a href="https://www.canopyapi.co" target="_blank" rel="sponsored noopener">
  <img
    src="https://docs.canopyapi.co/badges/powered-by-canopy-dark.svg"
    alt="Powered by Canopy API"
    width="136"
    height="48"
  />
</a>
```

If your site follows the visitor's light or dark preference, this version switches automatically:

```html
<a href="https://www.canopyapi.co" target="_blank" rel="sponsored noopener">
  <picture>
    <source
      srcset="https://docs.canopyapi.co/badges/powered-by-canopy-dark.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img
      src="https://docs.canopyapi.co/badges/powered-by-canopy-light.svg"
      alt="Powered by Canopy API"
      width="136"
      height="48"
    />
  </picture>
</a>
```

{% callout title="Keep rel=\"sponsored\" on the link" %}
Because the badge earns you a discount, search engines treat it as a sponsored link. Leaving `rel="sponsored"` in place keeps both your site and ours within their guidelines.
{% /callout %}

Both badges are SVG files, so they stay sharp at any size. Scale them by changing `width` and `height` together, and please don't recolor or redraw them.

---

## Share what you built

Show other developers how you use Canopy API. Any of these counts:

- **Case study**: work with our team on a short write-up of what you built and how Canopy API fits in. We do most of the writing and publish it on our site with a link to your project.
- **Tutorial or blog post**: publish a post on your own blog, Dev.to, Medium, or similar that walks through something you built with Canopy API.
- **Open-source project**: publish a library, integration, or example app that uses Canopy API and mention it in the README.
- **Docs recipe**: contribute a recipe to these docs, like the [Coupon Finder](/recipes/coupon-finder). See [how to contribute](/contributing/how-to-contribute).

Write honestly about your experience, including anything that didn't work well. If you mention the discount, even better.

---

## Review us

Reviews help other developers decide whether Canopy API is right for them.

- **G2**: [review Canopy API on G2](https://www.g2.com/products/canopy-api-real-time-amazon-product-data-api/reviews) and earn the discount for your plan. The discount is the same whatever rating you give, so please be candid, and mention in your review that you received a discount for writing it.
- **Trustpilot**: we'd also appreciate a [review on Trustpilot](https://www.trustpilot.com/review/canopyapi.co). Trustpilot doesn't allow rewards for reviews, so there is no discount for this one.
