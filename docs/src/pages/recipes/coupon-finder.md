---
title: Coupon Finder
description: Search Amazon products and surface any available coupons using the Canopy REST API.
---

This recipe uses the REST search endpoint to find Amazon products matching a search term, then loops through the results to list any items that have an active coupon. Useful for building deal finders, price trackers, or coupon aggregator tools.

## How it works

The `/api/amazon/search` endpoint returns a `coupon` object on each product result when a coupon is available. The `coupon.label` field contains the human-readable discount text (e.g. `"Save 20%"` or `"$5 off coupon"`). Products without a coupon return `null` for this field, so filtering is straightforward.

## Example

```javascript
const apiKey = '<YOUR_API_KEY>';
const searchTerm = 'coffee maker';

async function findCoupons(searchTerm, page = 1) {
  const params = new URLSearchParams({
    searchTerm,
    domain: 'US',
    page,
  });

  const response = await fetch(`https://rest.canopyapi.co/api/amazon/search?${params}`, {
    headers: {
      'API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();
  const { results, pageInfo } = data.amazonProductSearchResults.productResults;

  // Filter to only products that have a coupon
  const withCoupons = results.filter((product) => product.coupon?.label);

  return { withCoupons, pageInfo };
}

async function main() {
  let page = 1;
  let hasNextPage = true;
  const allCoupons = [];

  // Page through results until no more pages (or set a max)
  while (hasNextPage && page <= 5) {
    const { withCoupons, pageInfo } = await findCoupons(searchTerm, page);
    allCoupons.push(...withCoupons);
    hasNextPage = pageInfo.hasNextPage;
    page++;
  }

  if (allCoupons.length === 0) {
    console.log('No coupons found.');
    return;
  }

  console.log(`Found ${allCoupons.length} products with coupons:\n`);

  for (const product of allCoupons) {
    console.log(`${product.title}`);
    console.log(`  Coupon: ${product.coupon.label}`);
    console.log(`  Price:  ${product.price?.display ?? 'N/A'}`);
    console.log(`  ASIN:   ${product.asin}`);
    console.log(`  URL:    ${product.url}`);
    console.log();
  }
}

main();
```

## Example output

```
Found 3 products with coupons:

Cuisinart DCC-3200P1 Perfectemp Coffee Maker
  Coupon: Save 20%
  Price:  $99.95
  ASIN:   B01N6T5QNO
  URL:    https://www.amazon.com/dp/B01N6T5QNO

Hamilton Beach Programmable Coffee Maker
  Coupon: $8.00 off coupon
  Price:  $44.99
  ASIN:   B0088NUTGE
  URL:    https://www.amazon.com/dp/B0088NUTGE
```

## Search parameters

Narrow results further using additional query parameters on the search endpoint:

| Parameter | Description |
|-----------|-------------|
| `searchTerm` | Keyword or phrase to search for |
| `domain` | Marketplace: `US`, `UK`, `DE`, `FR`, etc. |
| `categoryId` | Filter to a specific Amazon category |
| `minPrice` / `maxPrice` | Price range filter |
| `sort` | `FEATURED`, `PRICE_ASCENDING`, `PRICE_DESCENDING`, `AVERAGE_CUSTOMER_REVIEW`, `MOST_RECENT` |
| `page` | Page number for paginating through results |
| `limit` | Number of results per page (typically 20–40) |

{% callout %}
**Note**: It is generally not recommended to expose your `API-KEY` to the browser. This is fine for testing, but in production your key should only be used server-side.
{% /callout %}
