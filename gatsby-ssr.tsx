import React from "react";
import { ApolloProvider } from "@apollo/client";
import type { GatsbySSR } from "gatsby";

import { client } from "./src/lib/apollo-client";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
