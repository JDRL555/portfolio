<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useThemeStore, useLanguageStore } from './stores'
import en from './data/site-en.json'
import es from './data/site-es.json'
import themes from './data/themes.json'

// import ThemeToggle from './components/ThemeToggle.vue'
// import LanguageToggle from './components/LanguageToggle.vue'

import Carousel from './components/Carousel.vue'
import WhoIAm from './sections/WhoIAm.vue'
  
const themeStore = useThemeStore()
const languageStore = useLanguageStore()

function applyTheme(theme: 'light' | 'dark') {
  const variables = themes[theme]
  const root = document.documentElement
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

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
  </main>
</template>

<style scoped>
/* Puedes agregar estilos locales si lo necesitas */
</style>
