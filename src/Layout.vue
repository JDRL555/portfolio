<script setup lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'

import { useThemeStore, useLanguageStore, useCountryStore } from './stores'
import en from './data/site-en.json'
import es from './data/site-es.json'
import themes from './data/themes.json'

// import ThemeToggle from './components/ThemeToggle.vue'
// import LanguageToggle from './components/LanguageToggle.vue'

import Carousel from './components/Carousel.vue'

import WhoIAm from './sections/WhoIAm.vue'
import StackAndPortfolio from './sections/Stack&Porfolio.vue'
import Experience from './sections/Experience.vue'
import ContactToMe from './sections/ContactToMe.vue'

import { CountriesAPI } from './services/CountriesAPI'
  
const themeStore = useThemeStore()
const languageStore = useLanguageStore()
const countriesStore = useCountryStore()

function applyTheme(theme: 'light' | 'dark') {
  const variables = themes[theme]
  const root = document.documentElement
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

onBeforeMount(async () => {
  const countries = await CountriesAPI.getAllCountries()

  if(countries.length > 0) {
    countriesStore.setCountries(countries)
  }
})

onMounted(() => {
  applyTheme(themeStore.theme)
})

watch(() => themeStore.theme, (value) => {
  applyTheme(value)
})

const content = computed(() => languageStore.language === "en" ? en : es)

</script>

<template>
  <main>
    <Carousel />

    <!-- Who I Am section -->
    <WhoIAm :content="content" />
    <hr>
    <!-- Stack&Portfolio -->
    <StackAndPortfolio :content="content" />
    <hr>
    <!-- Experience -->
    <Experience :content="content" />
    <hr>
    <!-- Contact Me -->
    <ContactToMe :content="content" />
  </main>
</template>

<style scoped>
/* Puedes agregar estilos locales si lo necesitas */
</style>
