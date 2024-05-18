---
title: Python
description: A simple example using python's 'requests' lib to query for Amazon data.
---

A simple example using python's 'requests' lib to query for Amazon data. You will need to modify the example to use your `API-KEY` in the request header. We have provided a **Replit** for testing or forking.

```python
import requests

# Define the URL of the GraphQL endpoint
url = 'https://graphql.canopyapi.co/'

# Define the GraphQL query
query = """
query amazonProduct($asin: String!) {
  amazonProduct(input: {asin: $asin}) {
    title
    mainImageUrl
    rating
    price {
      display
    }
  }
}
"""

headers = {
    'Content-Type': 'application/json',
    'API-KEY': '<YOUR_API_KEY>',
}

variables = {
  'asin': 'B0B3JBVDYP',
}

# Define the request payload
payload = {
    'query': query,
    'variables': variables
}

# Send the POST request to the GraphQL endpoint
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Query failed to run with a {response.status_code} status code.")
    print(f"Response: {response.text}")
```

[View on Replit](https://replit.com/@RyanAnderson1/Canopy-API-Example#main.py)
