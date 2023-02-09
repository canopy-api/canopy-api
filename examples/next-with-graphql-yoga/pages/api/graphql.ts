import { createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { useExecutor } from "@graphql-tools/executor-yoga";

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

export default createYoga({
  plugins: [
    useExecutor(remoteExecutor),
  ],
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
