import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark' as Theme
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
    setTheme(value: Theme) {
      this.theme = value
    }
  },
  persist: true
})