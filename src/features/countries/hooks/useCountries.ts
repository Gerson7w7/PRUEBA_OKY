import { COUNTRIES_QUERY } from "../../../graphql/queries";
import type { CountriesQueryData } from "../../../types/country";
import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

export const PAGE_SIZE = 12;

export const useContries = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<CountriesQueryData>(
    COUNTRIES_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  // Req 2: filtro en cliente por limitaciones de busqueda libre en el schema publico.
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / PAGE_SIZE),
  );
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

  return {
    countries: pageCountries,
    filteredCountries,
    loading,
    error,
    search,
    currentPage: safePage,
    totalPages,
    data,
    handleSearchChange,
    handlePageChange,
    refetch,
  };
};
