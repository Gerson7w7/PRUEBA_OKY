import React from "react";
import { ApolloProvider } from "@apollo/client";
import type { GatsbyBrowser } from "gatsby";

import { client } from "./src/lib/apollo-client";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
