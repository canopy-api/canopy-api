---
title: Apollo Server
description: An example using our GraphQL API with [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
---

An example using our GraphQL API with [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

[Source Repository](https://github.com/canopy-api/canopy-api/tree/main/examples/next-with-apollo-server)

---

{% callout %}
**Note**: Using Apollo Server with Next.js for this example requires using top-level await, which is [not currently supported by SWC](https://github.com/vercel/next.js/issues/31054). The example repository provides the `.babelrc` and `next.config.js` changes to enable top-level await with Babel and Webpack 5.
{% /callout %}

## Quick Start

1. Create your application using `create-next-app`

```bash
npx create-next-app --example https://github.com/canopy-api/canopy-api/tree/main/docs/examples/next-with-apollo-server your-application-name
```

2. Replace Authorization header placeholder `CANOPY-API-KEY` in `apollo/schema.ts` with your API Key (found in your [dashboard](https://www.canopyapi.co/dashboard))

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

To add the Canopy API schema to an existing Next.js GraphQL API Route with Apollo Server, you will need to use `@graphql-tools/stitch` and add the `Authorization` header. Here is an example:

```typescript
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { schemaFromExecutor } from '@graphql-tools/wrap'
import { stitchSchemas } from '@graphql-tools/stitch'

const CANOPY_GRAPHQL_ENDPOINT = 'https://endpoint.canopyapi.co/'

const remoteExecutor = buildHTTPExecutor({
  endpoint: CANOPY_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: 'Bearer CANOPY-API-KEY',
  },
})

const canopySubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
}

const schema = stitchSchemas({
  subschemas: [canopySubschema],
})

const apolloServer = new ApolloServer({ schema })

export default startServerAndCreateNextHandler(apolloServer)
```
