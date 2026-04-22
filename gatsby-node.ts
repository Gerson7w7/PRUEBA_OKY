import path from "node:path";
import type { GatsbyNode } from "gatsby";

type CountryCodeResponse = {
  data?: {
    countries: Array<{ code: string }>;
  };
  errors?: Array<{ message: string }>;
};

const endpoint = "https://countries.trevorblades.com/graphql";

export const createPages: GatsbyNode["createPages"] = async ({ actions, reporter }) => {
  const { createPage } = actions;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "query CountryCodes { countries { code } }",
    }),
  });

  const payload = (await response.json()) as CountryCodeResponse;

  if (!response.ok || payload.errors || !payload.data) {
    reporter.panic(
      "No se pudieron generar las paginas de detalle",
      payload.errors ? new Error(payload.errors.map((item) => item.message).join("; ")) : undefined
    );
    return;
  }

  payload.data.countries.forEach((country) => {
    createPage({
      path: `/country/${country.code}`,
      component: path.resolve("./src/features/country-detail/components/index.tsx"),
      context: { code: country.code },
    });
  });
};
