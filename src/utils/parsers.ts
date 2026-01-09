import type { Country, FormattedCountry } from "../services/CountriesAPI";

export function parseYears(text: string): string {
  return text.replace('{years}', `${new Date().getFullYear() - 2022}`)
}

export function parseCountriesNumber(countries: Country[]): FormattedCountry[] {
  const newCountries = countries.map(country => {
    const root = country.idd.root ?? '';
    const suffixes = country.idd.suffixes ?? [];
  
    const code = suffixes.length > 0 && suffixes.length <= 1 ? `${root}${suffixes[0]}` : suffixes.length > 1 ? root : root;
    
    return {
      name: country.name.common,
      flag: country.flags.png,
      code
    };
  })

  return newCountries.sort((a, b) => a.name.localeCompare(b.name));
}