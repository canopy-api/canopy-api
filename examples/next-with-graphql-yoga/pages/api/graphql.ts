import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";
import { createYoga } from "graphql-yoga";
import { stitchSchemas } from "@graphql-tools/stitch";

const CANOPY_GRAPHQL_ENDPOINT = "https://endpoint.canopyapi.co/";

const remoteExecutor = buildHTTPExecutor({
  endpoint: CANOPY_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: "Bearer CANOPY-API-KEY",
  },
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const canopySubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};

const schema = stitchSchemas({
  subschemas: [canopySubschema],
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
