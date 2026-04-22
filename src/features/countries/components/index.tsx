import { useContries, PAGE_SIZE } from "../hooks/useCountries";
import { CountryTable } from "../../../components/CountryTable";
import { Pagination } from "../../../components/Pagination";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../../components/States";
import React from "react";

export const Countries = () => {
  const {
    countries,
    filteredCountries,
    loading,
    error,
    search,
    data,
    handleSearchChange,
    currentPage: safePage,
    handlePageChange,
    refetch,
  } = useContries();

  return (
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

      {!loading && !error && filteredCountries.length === 0 ? (
        <EmptyState />
      ) : null}

      {!error && countries.length > 0 ? (
        <>
          <p className="results-count" aria-live="polite">
            Mostrando {countries.length} de {filteredCountries.length}{" "}
            resultados.
          </p>
          <CountryTable countries={countries} />
          <Pagination
            totalItems={filteredCountries.length}
            pageSize={PAGE_SIZE}
            currentPage={safePage}
            onPageChange={handlePageChange}
          />
        </>
      ) : null}
    </section>
  );
};
