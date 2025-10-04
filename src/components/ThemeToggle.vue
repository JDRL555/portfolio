<script setup lang="ts">
import { useThemeStore } from '../stores'
import { watch } from 'vue'

const themeStore = useThemeStore()

watch(() => themeStore.theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
}, { immediate: true })

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<template>
  <button @click="toggleTheme" class="px-4 py-2 rounded bg-primary text-white">
    {{ themeStore.theme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>
