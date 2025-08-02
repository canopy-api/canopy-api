# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is an open-source monorepo for Canopy API containing:

- **docs/**: Next.js documentation website using Markdoc (published to docs.canopyapi.co)
- **examples/**: Working GraphQL integration examples for common setups
  - `next-with-apollo-server/`: Apollo Server integration with schema stitching
  - `next-with-graphql-yoga/`: GraphQL Yoga integration

## Development Commands

### Documentation Site (docs/)
```bash
cd docs
npm install
npm run dev     # Start development server at localhost:3000
npm run build   # Build for production
npm run start   # Start production server
```

### Example Projects
Each example has similar commands:
```bash
cd examples/next-with-apollo-server  # or next-with-graphql-yoga
npm install
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
```

## Architecture Overview

### Documentation Site
- Built with Next.js 13 and Markdoc for content management
- Uses Tailwind CSS with custom styling and typography plugin
- Markdown files in `src/pages/` are automatically converted to routes
- Custom components in `src/components/` extend Markdoc functionality
- Supports syntax highlighting with Prism

### GraphQL Examples
Both examples demonstrate connecting to Canopy API's GraphQL endpoint:
- **Apollo Server example**: Uses schema stitching to combine Canopy's remote schema
- **GraphQL Yoga example**: Direct proxy approach with HTTP executor
- Both require API key authentication via `Authorization: Bearer` header
- Canopy endpoint: `https://endpoint.canopyapi.co/` (examples) or `https://graphql.canopyapi.co/` (docs)

### Key Integration Pattern
Examples show how to:
1. Create HTTP executor pointing to Canopy's GraphQL endpoint
2. Add API key authentication in headers
3. Either stitch schemas (Apollo) or proxy requests (Yoga)
4. Expose the combined/proxied schema through Next.js API routes

## Important Notes

- API keys should be replaced from placeholder `CANOPY-API-KEY` in examples
- Documentation uses Markdoc tags and nodes for enhanced content (see `docs/markdoc/`)
- Examples are TypeScript-based with Next.js API routes pattern