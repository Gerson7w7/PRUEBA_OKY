export type Country = {
  code: string;
  name: string;
  emoji: string;
  capital: string | null;
  currency: string | null;
  continent: {
    name: string;
  };
};

export type CountryDetail = Country & {
  native: string;
  phone: string;
  languages: Array<{
    code: string;
    name: string;
  }>;
};

export type CountriesQueryData = {
  countries: Country[];
};

export type CountryDetailQueryData = {
  country: CountryDetail | null;
};

export type CountryDetailVars = {
  code: string;
};
