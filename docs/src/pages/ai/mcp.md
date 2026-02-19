---
title: Canopy API MCP
description: Use the Canopy API MCP server to give AI assistants and agents direct access to Amazon product data.
---

The [Canopy API MCP server](https://github.com/canopy-api/canopy-api-mcp) is a TypeScript implementation of the [Model Context Protocol](https://modelcontextprotocol.io/) that gives AI assistants and agents direct access to Amazon product data. It runs on Cloudflare Workers and exposes 11 tools covering product lookup, search, categories, sellers, and more.

## Installation

Clone and deploy the MCP server from GitHub:

```bash
git clone https://github.com/canopy-api/canopy-api-mcp
cd canopy-api-mcp
npm install
```

Start a local development server:

```bash
npm run dev
```

The server will be available at `http://localhost:8787/mcp`.

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Connecting to Claude Desktop

Add the server to your Claude Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "canopy": {
      "url": "http://localhost:8787/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR_API_KEY>"
      }
    }
  }
}
```

Replace `<YOUR_API_KEY>` with your key from the [Canopy API dashboard](https://canopyapi.co). After saving, restart Claude Desktop — the Canopy tools will appear in the tools panel.

## Authentication

The server accepts your API key in any of these header formats:

```
CANOPY-API-KEY: your-api-key
API-KEY: your-api-key
X-API-KEY: your-api-key
Authorization: Bearer your-api-key
```

## Available Tools

The server exposes 11 tools that AI assistants can invoke:

| Tool | Description |
|------|-------------|
| `get_amazon_product` | Product details by ASIN, URL, or GTIN |
| `get_amazon_product_variants` | Product variants and options |
| `get_amazon_product_stock` | Stock level estimates |
| `get_amazon_product_sales` | Sales estimates (weekly/monthly/annual) |
| `get_amazon_product_reviews` | Top customer reviews |
| `search_amazon_products` | Search with filters and pagination |
| `get_amazon_autocomplete` | Search suggestions |
| `get_amazon_categories` | Root category taxonomy |
| `get_amazon_category` | Category details with subcategories |
| `get_amazon_seller` | Seller info and listings |
| `get_amazon_author` | Author info and books |

## Testing with MCP Inspector

You can test the server using the official MCP Inspector before connecting it to an AI client:

```bash
npx -y @modelcontextprotocol/inspector@latest
```

Connect the inspector to your running server URL (e.g. `http://localhost:8787/mcp`) and invoke tools interactively.
