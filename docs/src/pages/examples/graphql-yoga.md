---
title: GraphQL Yoga
description: An example using our GraphQL API with [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
---

An example using our GraphQL API with [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)

[Source Repository](https://github.com/canopy-api/canopy-api/tree/main/docs/examples/next-with-graphql-yoga)

---

{% callout %}
**Note**: Using GraphQL Yoga with Next.js for this example requires using top-level await, which is [not currently supported by SWC](https://github.com/vercel/next.js/issues/31054). The example repository provides the `.babelrc` and `next.config.js` changes to enable top-level await with Babel and Webpack 5.
{% /callout %}

## Quick Start

1. Create your application using `create-next-app`

```bash
npx create-next-app --example https://github.com/canopy-api/canopy-api/tree/main/docs/examples/next-with-graphql-yoga your-application-name
```

2. Replace Authorization header placeholder `CANOPY-API-KEY` in `pages/api/graphql.ts` with your API Key (found in your [dashboard](https://www.canopyapi.co/dashboard))

```typescript
const remoteExecutor = buildHTTPExecutor({
  ...
  headers: {
    Authorization: "Bearer CANOPY-API-KEY",
  },
});
```

3. Start the Next.js server: `npm run dev`
4. Open the GraphQL Playground at `http://localhost:3000/api/graphql`

## GraphQL API Route Example

To add the Canopy API schema to an existing Next.js GraphQL API Route with GraphQL Yoga, you will need to use `@graphql-tools/stitch` and add the `Authorization` header. Here is an example:

```typescript
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { schemaFromExecutor } from '@graphql-tools/wrap'
import { createYoga } from 'graphql-yoga'
import { stitchSchemas } from '@graphql-tools/stitch'

const CANOPY_GRAPHQL_ENDPOINT = 'https://endpoint.canopyapi.co/'

const remoteExecutor = buildHTTPExecutor({
  endpoint: CANOPY_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: 'Bearer CANOPY-API-KEY',
  },
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

const canopySubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
}

const schema = stitchSchemas({
  subschemas: [canopySubschema],
})

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})
```
