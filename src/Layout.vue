<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useThemeStore, useLanguageStore } from './stores'
import en from './data/site-en.json'
import es from './data/site-es.json'
import themes from './data/themes.json'

import Icons from './components/icons/Icons.vue'

// import ThemeToggle from './components/ThemeToggle.vue'
// import LanguageToggle from './components/LanguageToggle.vue'

import Carousel from './components/Carousel.vue'
import { parseYears } from './utils/parsers.ts'
  
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
    <section class="m-15">
      <div class="flex items-center justify-between gap-12 w-full">
        <div class="w-[60%]">
          <h1 class="text-5xl font-bold mb-8">{{ content.who_i_am.title }}</h1>
          <!-- <div class="flex gap-4">
            <ThemeToggle />
            <LanguageToggle />
          </div> -->
    
          <p 
            v-for="desc in content.who_i_am.description" 
            v-html="parseYears(desc)"
            class="text-xl mb-5" 
            :key="desc"
          ></p>
        </div>
        <div class="w-[40%]">
          <img 
            src="./assets/images/Foto perfil.jpeg" 
            alt="Profile Picture"
            class="rounded-full w-[20rem] border-4 border-[var(--secondary-color)] m-auto"
          >
          <div class="flex gap-5 pt-5 justify-center">
            <a href="https://github.com/JDRL555" target="blank">
              <Icons 
                width="60"
                height="60"
                icon-name="github"
              />
            </a>

            <a href="https://www.linkedin.com/in/joshua-rodríguez/" target="blank">
              <Icons 
                width="60"
                height="60"
                icon-name="linkedin"
              />
            </a>

            <a href="https://drive.google.com/file/d/1zIP6r68486z23dqkgtxYng2ibKsSD8Uj/view?usp=sharing" target="blank">
              <Icons 
                width="60"
                height="60"
                icon-name="document"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Puedes agregar estilos locales si lo necesitas */
</style>
