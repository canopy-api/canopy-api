import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";
import { stitchSchemas } from "@graphql-tools/stitch";

const CANOPY_GRAPHQL_ENDPOINT = "https://endpoint.canopyapi.co/";

const remoteExecutor = buildHTTPExecutor({
  endpoint: CANOPY_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: "Bearer CANOPY-API-KEY",
  },
});

const canopySubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};

export const schema = stitchSchemas({
  subschemas: [canopySubschema],
});
