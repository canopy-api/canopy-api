import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";

const AmazonProductQuery = gql`
  query AmazonProduct {
    amazonProduct(input: { asinLookup: { asin: "B0BDHWDR12" } }) {
      title
      brand
      mainImageUrl
    }
  }
`;

const Index = () => {
  const {
    data: { amazonProduct },
  } = useQuery(AmazonProductQuery);

  return (
    <div>
      <h1>{amazonProduct?.title}</h1>
      <h2>{amazonProduct?.brand}</h2>
      <img width={200} src={amazonProduct?.mainImageUrl} />
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AmazonProductQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
