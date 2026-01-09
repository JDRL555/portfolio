// stores/language.ts
import { defineStore } from 'pinia'
import type { Country } from '../services/CountriesAPI'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [] as Country[]
  }),
  actions: {
    setCountries(countries: Country[]) {
      this.countries = countries
    }
  },
  persist: true
})