---
title: Python
description: A simple example using python's 'requests' lib to query the REST API for Amazon data.
---

A simple example using python's 'requests' lib to query the REST API for Amazon data. You will need to modify the example to use your `API-KEY` in the request header.

```python
import requests

# Define the REST API endpoint
url = 'https://rest.canopyapi.co/api/amazon/product'

# Define the parameters
params = {
    'asin': 'B0B3JBVDYP',
    'domain': 'US'
}

# Define the headers
headers = {
    'API-KEY': '<YOUR_API_KEY>',
    'Content-Type': 'application/json'
}

# Send the GET request to the REST API endpoint
response = requests.get(url, params=params, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Request failed with status code: {response.status_code}")
    print(f"Response: {response.text}")
```

This example fetches product data for an Amazon product using the REST API endpoint. The response will contain product information including title, price, rating, and more.