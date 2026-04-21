import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "OKY Wallet - Transaction Explorer",
    description: "Mini app de historial de movimientos usando GraphQL publico.",
  },
  trailingSlash: "never",
};

export default config;
