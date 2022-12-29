---
title: Fetch (JavaScript)
description: An example using the browser's fetch API to query for Amazon data.
---

A basic example using the browser's [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to query for Amazon data. You will need to modify the example to use your `API-KEY` in the request header. We have provided a full example using **Codesandbox** for testing purposes.

{% callout %}
**Note**: It is generally not recommended to expose your `API-KEY` to the browser. This is okay for testing and proof of concepts but your key should not be exposed to clients in production.
{% /callout %}

```javascript
const query = `
  query amazonProduct {
    amazonProduct(input: {asin: \"B0B3JBVDYP\"}) {
      title
      mainImageUrl
      rating
      price {
        formatted
      }
    }
  }
`

const response = await fetch('https://graphql.canopyapi.co/', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'API-KEY': '<YOUR_API_KEY>',
  },
  body: JSON.stringify(data),
})
return response.json()
```

[![Edit summer-glade-knu16k](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/summer-glade-knu16k?fontsize=14&hidenavigation=1&theme=dark)
