import React from "react";
import { useQuery } from "@apollo/client";
import { Link, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "../../components/Layout";
import { EmptyState, ErrorState, LoadingState } from "../../components/States";
import { COUNTRY_DETAIL_QUERY } from "../../graphql/queries";
import type { CountryDetailQueryData, CountryDetailVars } from "../../types/country";

type DetailPageContext = {
  code: string;
};

export default function CountryDetailPage(props: PageProps<unknown, DetailPageContext>) {
  const { code } = props.pageContext;

  const { data, loading, error, refetch } = useQuery<CountryDetailQueryData, CountryDetailVars>(
    COUNTRY_DETAIL_QUERY,
    {
      variables: { code },
      fetchPolicy: "cache-first",
    }
  );

  const country = data?.country;

  return (
    <Layout>
      <section className="card detail-card">
        <Link to="/" className="ghost-btn back-link">
          Volver a la lista
        </Link>

        {loading && !country ? <LoadingState /> : null}

        {error ? (
          <ErrorState
            message="No fue posible cargar el detalle del registro."
            onRetry={() => {
              void refetch();
            }}
          />
        ) : null}

        {!loading && !error && !country ? <EmptyState /> : null}

        {country ? (
          <article>
            <h2>
              {country.emoji} {country.name}
            </h2>

            <dl className="detail-grid">
              <div>
                <dt>Codigo</dt>
                <dd>{country.code}</dd>
              </div>
              <div>
                <dt>Nombre nativo</dt>
                <dd>{country.native}</dd>
              </div>
              <div>
                <dt>Capital</dt>
                <dd>{country.capital ?? "Sin capital"}</dd>
              </div>
              <div>
                <dt>Moneda</dt>
                <dd>{country.currency ?? "N/A"}</dd>
              </div>
              <div>
                <dt>Prefijo telefonico</dt>
                <dd>+{country.phone}</dd>
              </div>
              <div>
                <dt>Continente</dt>
                <dd>{country.continent.name}</dd>
              </div>
            </dl>

            <h3>Idiomas</h3>
            <ul className="language-list">
              {country.languages.map((language) => (
                <li key={language.code}>{language.name}</li>
              ))}
            </ul>
          </article>
        ) : null}
      </section>
    </Layout>
  );
}

export const Head: HeadFC<unknown, DetailPageContext> = ({ pageContext }) => {
  return <title>Detalle {pageContext.code} | OKY Wallet</title>;
};
