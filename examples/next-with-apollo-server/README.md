# Next.js with Apollo Server

This example uses Next.js [API routes](https://nextjs.org/docs/api-routes/introduction) to provide an Apollo Server service at `/api/graphql`. This server proxies to the [Canopy API endpoint](https://endpoint.canopyapi.co/) and enables adding your API key to the request.

## Overview

This project uses:

1. Next.js + React
2. [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - for the GraphQL server
3. GraphQL Tools + [Schema Stitching](https://the-guild.dev/graphql/stitching/docs) - to stitch the Canopy Schema to GraphQL Server
4. [Apollo Client](https://www.apollographql.com/docs/react/) - for data fetching

Note: there is a special config to enable `top-level await` syntax in Next.js. This config can be found in `.babelrc` and `next.config.js`. This is a non-standard configuration required until [swc enables top-level await support](https://github.com/vercel/next.js/issues/31054) is fixed.

## Getting Started

1. Create your app from our example

```
npx create-next-app --example https://github.com/canopy-api/canopy-api/tree/main/docs/examples/next-with-apollo-server my-application
```

2. Replace Authorization header placeholder `CANOPY-API-KEY` in `pages/api/graphql.ts` with your API Key (found on your [dashboard](https://www.canopyapi.co/dashboard))

```
const remoteExecutor = buildHTTPExecutor({
  ...
  headers: {
    Authorization: "Bearer CANOPY-API-KEY",
  },
});
```

3. Start application

```
npm run dev
```

4. Open browser to http://localhost:3000 (playground is available at http://localhost:3000/api/graphql)
