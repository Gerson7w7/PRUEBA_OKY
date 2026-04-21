import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
      capital
      currency
      continent {
        name
      }
    }
  }
`;

export const COUNTRY_DETAIL_QUERY = gql`
  query CountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      native
      emoji
      capital
      currency
      phone
      continent {
        name
      }
      languages {
        code
        name
      }
    }
  }
`;
