// stores/language.ts
import { defineStore } from 'pinia'

export type Language = 'en' | 'es'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'en' as Language
  }),
  actions: {
    toggleLanguage() {
      this.language = this.language === 'en' ? 'es' : 'en'
    },
    setLanguage(value: Language) {
      this.language = value
    }
  },
  persist: true
})