export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  name: {
    common: string;
  }
}

export interface FormattedCountry {
  name: string;
  flag: string;
  code: string;
}

export class CountriesAPI {
  private static BASE_URL = 'https://restcountries.com/v3.1';

  static async getAllCountries(): Promise<Country[]> {
    const res = await fetch(`${this.BASE_URL}/all?fields=flags,idd,name`);

    if(res.ok) {
      const data = await res.json() as Country[];
      return data;
    }

    return [] as Country[];
  }
}