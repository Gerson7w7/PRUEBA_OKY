import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import type { HeadFC, PageProps } from "gatsby";

import { CountryTable } from "../components/CountryTable";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "../components/States";
import { COUNTRIES_QUERY } from "../graphql/queries";
import type { CountriesQueryData } from "../types/country";

const PAGE_SIZE = 12;

export default function IndexPage(_props: PageProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<CountriesQueryData>(COUNTRIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const filteredCountries = useMemo(() => {
    if (!data?.countries) {
      return [];
    }

    const term = search.trim().toLowerCase();

    if (!term) {
      return data.countries;
    }

    return data.countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term) ||
        country.continent.name.toLowerCase().includes(term)
      );
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const pageCountries = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredCountries.slice(start, start + PAGE_SIZE);
  }, [filteredCountries, safePage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <Layout>
      <section className="card">
        <div className="toolbar">
          <div>
            <h2>Movimientos simulados</h2>
            <p className="muted">Fuente: GraphQL publica (Countries API)</p>
          </div>

          <label className="search-field" htmlFor="country-search">
            <span>Filtrar</span>
            <input
              id="country-search"
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre, codigo o continente"
            />
          </label>
        </div>

        {loading && !data ? <LoadingState /> : null}

        {error ? (
          <ErrorState
            message="No pudimos cargar los datos. Verifica tu conexion y vuelve a intentar."
            onRetry={() => {
              void refetch();
            }}
          />
        ) : null}

        {!loading && !error && filteredCountries.length === 0 ? <EmptyState /> : null}

        {!error && pageCountries.length > 0 ? (
          <>
            <p className="results-count" aria-live="polite">
              Mostrando {pageCountries.length} de {filteredCountries.length} resultados.
            </p>
            <CountryTable countries={pageCountries} />
            <Pagination
              totalItems={filteredCountries.length}
              pageSize={PAGE_SIZE}
              currentPage={safePage}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </section>
    </Layout>
  );
}

export const Head: HeadFC = () => <title>OKY Wallet | Transaction Explorer</title>;
