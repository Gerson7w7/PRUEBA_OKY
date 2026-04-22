import { COUNTRY_DETAIL_QUERY } from "../../../graphql/queries";
import type {
  CountryDetailQueryData,
  CountryDetailVars,
} from "../../../types/country";
import { useQuery } from "@apollo/client";

export const useCountryDetail = (code: string) => {
  const { data, loading, error, refetch } = useQuery<
    CountryDetailQueryData,
    CountryDetailVars
  >(COUNTRY_DETAIL_QUERY, {
    variables: { code },
    fetchPolicy: "cache-first",
  });

  const country = data?.country;

  return { loading, error, refetch, country };
};
