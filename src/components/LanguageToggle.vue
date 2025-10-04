<script setup lang="ts">
import { useLanguageStore } from '../stores'

const languageStore = useLanguageStore()

function toggleLanguage() {
  languageStore.toggleLanguage()
}
</script>

<template>
  <button @click="toggleLanguage" class="px-4 py-2 rounded bg-primary text-white">
    {{ languageStore.language === 'en' ? '🇺🇸' : '🇪🇸' }}
  </button>
</template>