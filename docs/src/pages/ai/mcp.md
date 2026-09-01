---
title: Canopy API MCP
description: Connect Claude and other MCP clients to the hosted Canopy API MCP server for read-only access to Amazon product data.
---

The Canopy API MCP server is a hosted [Model Context Protocol](https://modelcontextprotocol.io/) server that gives AI assistants and agents direct access to Amazon product data — product lookup, search, offers, reviews, sales estimates, categories, sellers, and more.

The server is hosted by Canopy, so there is nothing to install or deploy. Point your MCP client at:

```
https://mcp.canopyapi.co/mcp
```

It speaks **Streamable HTTP** and exposes **17 tools**. Every tool is **read-only**: the server queries Amazon product data through the Canopy API and never writes to Amazon or to your Amazon account. Tool calls count against your Canopy plan's usage, the same as REST or GraphQL requests.

## Connecting

### Claude

1. Open **Settings → Connectors**.
1. Click **Add custom connector**.
1. Enter the server URL: `https://mcp.canopyapi.co/mcp`
1. Click **Connect**, then sign in with your Canopy account when the browser window opens.

Once connected, the Canopy tools appear in Claude's tools panel and can be used in any conversation.

{% callout %}
**Tip**: You need a Canopy account to sign in. [Sign up](https://www.canopyapi.co/signin?view=sign_up) for free if you don't have one yet.
{% /callout %}

### Other MCP clients

Any client that supports remote MCP servers over Streamable HTTP can connect to the same URL. Add a remote server entry pointing at `https://mcp.canopyapi.co/mcp`:

```json
{
  "mcpServers": {
    "canopy": {
      "url": "https://mcp.canopyapi.co/mcp"
    }
  }
}
```

Clients that support OAuth will prompt you to sign in on first connection. Clients without OAuth support can authenticate with a header instead — see [Authentication](#authentication) below.

## Authentication

### OAuth 2.1 (recommended)

The server supports OAuth 2.1 sign-in backed by Supabase as the authorization server, with **dynamic client registration** — no client ID or secret to configure. The requested scopes are `openid`, `email`, and `offline_access`.

An unauthenticated request returns `401 Unauthorized` with a resource metadata pointer:

```
WWW-Authenticate: Bearer resource_metadata="https://mcp.canopyapi.co/.well-known/oauth-protected-resource"
```

OAuth-capable clients follow this automatically: they discover the authorization server, register themselves, and open a browser window for you to sign in with your Canopy account. You never handle a token by hand.

### API key headers (fallback)

For clients that don't support OAuth, pass your Canopy API key in a header. Any of these formats work:

```
CANOPY-API-KEY: your-api-key
API-KEY: your-api-key
X-API-KEY: your-api-key
Authorization: Bearer your-api-key
```

Your API key is available in the [Canopy API dashboard](https://www.canopyapi.co/). Treat it as a secret — don't commit it or share it.

## Available tools

All 17 tools are read-only.

| Tool | Description |
|------|-------------|
| `get_amazon_product` | Product details by ASIN, URL, or GTIN |
| `get_amazon_product_variants` | Product variants and options |
| `get_amazon_product_offers` | Seller offers and Buy Box info |
| `get_amazon_product_stock` | Stock level estimates |
| `get_amazon_product_sales` | Sales estimates (weekly/monthly/annual) |
| `get_amazon_product_top_reviews` | Top customer reviews |
| `search_amazon_products` | Search with filters, sorting, and pagination |
| `get_amazon_autocomplete` | Search term suggestions |
| `get_amazon_deals` | Current Amazon deals |
| `get_amazon_bestsellers` | Best-selling products for a category |
| `get_amazon_bestseller_categories` | Best seller category list |
| `get_amazon_categories` | Root category taxonomy |
| `get_amazon_category` | Category details with products and subcategories |
| `get_amazon_seller` | Seller info and listings |
| `get_amazon_author` | Author info and books |
| `get_amazon_asin_from_gtin` | ASIN lookup by ISBN, UPC, or EAN |
| `get_amazon_gtin_from_asin` | GTIN lookup by ASIN |

## Example prompts

Once connected, ask in plain language and the assistant picks the right tools:

- "Compare the Sony WH-1000XM5 and Bose QuietComfort Ultra on Amazon — price, rating, and what reviewers complain about most."
- "What are the top 10 best sellers in Kitchen & Dining right now, and which are on deal today?"
- "For ASIN B01HY0JA3G, list every seller offer, the variants, and estimated monthly sales."

## Testing with MCP Inspector

You can explore the server's tools interactively with the official MCP Inspector before wiring it into a client:

```bash
npx -y @modelcontextprotocol/inspector@latest
```

In the inspector, set the transport to **Streamable HTTP**, enter `https://mcp.canopyapi.co/mcp`, and connect. The inspector will walk you through the OAuth sign-in, or you can supply an API key header instead.

## Self-hosting

The server is open source and runs on Cloudflare Workers. Self-hosting is optional — the hosted server at `https://mcp.canopyapi.co/mcp` is the recommended path for most users.

```bash
git clone https://github.com/canopy-api/canopy-api-mcp
cd canopy-api-mcp
npm install
npm run dev
```

A local server runs at `http://localhost:8787/mcp`. Deploy your own instance to Cloudflare Workers with:

```bash
npm run deploy
```

Self-hosted instances authenticate with API key headers. OAuth sign-in requires the Canopy-hosted authorization server.
