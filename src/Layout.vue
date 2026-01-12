<script setup lang="ts">
import { computed, onBeforeMount, onMounted, watch } from 'vue'

import { useThemeStore, useLanguageStore, useCountryStore } from './stores'
import en from './data/site-en.json'
import es from './data/site-es.json'
import themes from './data/themes.json'

import NavigationSidebar from './components/NavigationSidebar.vue'

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
  <NavigationSidebar />
  <main>
    <div id="home">
      <Carousel />
    </div>

    <!-- Who I Am section -->
    <div id="who-i-am">
      <WhoIAm :content="content" />
    </div>
    <hr>
    <!-- Stack&Portfolio -->
    <div id="stack-portfolio">
      <StackAndPortfolio :content="content" />
    </div>
    <hr>
    <!-- Experience -->
    <div id="experience">
      <Experience :content="content" />
    </div>
    <hr>
    <!-- Contact Me -->
    <div id="contact-me">
      <ContactToMe :content="content" />
    </div>
  </main>
</template>

<style scoped>
/* Puedes agregar estilos locales si lo necesitas */
</style>
