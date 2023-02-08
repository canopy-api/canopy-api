import useSWR from "swr";

const fetcher = (query: string) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

type GraphQLResponse = {
  errors: { message: string }[];
  data: {
    amazonProduct?: {
      title: string;
      brand: string;
      mainImageUrl: string;
    };
  };
};

export default function Index() {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR<GraphQLResponse>(
    `{amazonProduct(input: { asinLookup: { asin: "B0BDHWDR12" } }) {
          title
          brand
          mainImageUrl
        }}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!response) return null;

  const { data, errors } = response;
  const { amazonProduct } = data;

  if (errors) {
    return errors.map((e) => <span>{e.message}</span>);
  }

  return (
    <div>
      <h1>{amazonProduct?.title}</h1>
      <h2>{amazonProduct?.brand}</h2>
      <img width={200} src={amazonProduct?.mainImageUrl} />
    </div>
  );
}
