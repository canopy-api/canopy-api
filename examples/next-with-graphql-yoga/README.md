# Next.js with GraphQL Yoga

This example uses Next.js [API routes](https://nextjs.org/docs/api-routes/introduction) to provide a GraphQL Yoga service at `/api/graphql`. This server proxies to the [Canopy API endpoint](https://endpoint.canopyapi.co/) and enables adding your API key to the request.

## Overview

This project uses:

1. Next.js + React
2. [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) - for the GraphQL server
3. GraphQL Tools + [Schema Stitching](https://the-guild.dev/graphql/stitching/docs) - to stitch the Canopy Schema to GraphQL Server
4. [SWR](https://swr.vercel.app/) - for data fetching

Note: there is a special config to enable `top-level await` syntax in Next.js. This config can be found in `.babelrc` and `next.config.js`. This is a non-standard configuration required until [swc enables top-level await support](https://github.com/vercel/next.js/issues/31054) is fixed.

## Getting Started

1. Create your app from our example

```
npx create-next-app --example https://github.com/canopy-api/canopy-api/tree/main/docs/examples/next-with-graphql-yoga my-application
```

2. Replace Authorization header placeholder `CANOPY-API-KEY` in `/api/graphql.ts` with your API Key (found on your [dashboard](https://www.canopyapi.co/dashboard))

```
const remoteExecutor = buildHTTPExecutor({
  ...
  headers: {
    Authorization: "Bearer CANOPY-API-KEY",
  },
});
```
