import React from "react";
import { Link } from "gatsby";

import type { Country } from "../types/country";

type CountryTableProps = {
  countries: Country[];
};

export function CountryTable({ countries }: CountryTableProps) {
  return (
    <div className="table-wrap" role="region" aria-label="Lista de movimientos">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Codigo</th>
            <th>Capital</th>
            <th>Moneda</th>
            <th>Continente</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.code}>
              <td>
                <Link className="country-link" to={`/country/${country.code}`}>
                  <span aria-hidden="true">{country.emoji}</span> {country.name}
                </Link>
              </td>
              <td>{country.code}</td>
              <td>{country.capital ?? "Sin capital"}</td>
              <td>{country.currency ?? "N/A"}</td>
              <td>{country.continent.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
