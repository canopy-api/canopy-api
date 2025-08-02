---
title: Fetch (JavaScript)
description: An example using the browser's fetch API to query the REST API for Amazon data.
---

A basic example using the browser's [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to query the REST API for Amazon data. You will need to modify the example to use your `API-KEY` in the request header.

{% callout %}
**Note**: It is generally not recommended to expose your `API-KEY` to the browser. This is okay for testing and proof of concepts but your key should not be exposed to clients in production.
{% /callout %}

```javascript
const asin = 'B0B3JBVDYP';
const apiKey = '<YOUR_API_KEY>';

const response = await fetch(`https://rest.canopyapi.co/api/amazon/product?asin=${asin}&domain=US`, {
  method: 'GET',
  headers: {
    'API-KEY': apiKey,
    'Content-Type': 'application/json'
  }
});

if (response.ok) {
  const data = await response.json();
  console.log(data);
} else {
  console.error('Request failed:', response.status);
}
```

This example fetches product data for an Amazon product using the REST API endpoint. The response will contain product information including title, price, rating, and more.