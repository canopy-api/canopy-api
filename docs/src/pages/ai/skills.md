---
title: Canopy Skills
description: Install reusable AI agent skills for querying Amazon data with the Canopy API.
---

[Canopy Skills](https://github.com/canopy-api/skills) are reusable, prompt-driven modules that give AI agents structured capabilities for working with the Canopy API. Install a skill once and any compatible AI agent can use it to query Amazon product data including pricing, reviews, search results, and sales estimates.

## Installation

Install the `amazon-data` skill using `npx`:

```bash
npx skills add https://github.com/canopy-api/skills --skill amazon-data
```

This fetches the skill definition from the Canopy Skills repository and registers it with your agent environment.

## Getting Started

1. Create an account at [canopyapi.co](https://canopyapi.co)
2. Retrieve your API key from the dashboard
3. Run the install command above

Once installed, the skill gives your agent the context it needs to query the Canopy API — covering product lookups, search, pricing, reviews, and more — using either the [REST API](https://rest.canopyapi.co/) or [GraphQL API](https://graphql.canopyapi.co/).

## What Skills Provide

Skills are structured capability modules rather than raw API wrappers. They include the prompts, instructions, and schema context an AI agent needs to:

- Search for Amazon products by keyword or category
- Look up product details, pricing, and availability by ASIN
- Fetch customer reviews and ratings
- Retrieve sales and demand estimates

This means you describe what you want in natural language and the agent handles the API calls — no manual query construction required.

{% callout %}
**Tip**: If you want direct tool-level access for AI assistants like Claude Desktop, see the [Canopy API MCP](/ai/mcp) server instead.
{% /callout %}
