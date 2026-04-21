import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: "https://countries.trevorblades.com/graphql",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          countries: {
            keyArgs: false,
            merge(_existing, incoming: unknown[]) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  },
});
