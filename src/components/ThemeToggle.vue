<script setup lang="ts">
import { useThemeStore } from '../stores'
import { watch } from 'vue'
import Icons from './icons/Icons.vue';

const themeStore = useThemeStore()

watch(() => themeStore.theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
}, { immediate: true })

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<template>
  <button @click="toggleTheme" class="px-4 py-2 rounded bg-primary text-white flex items-center justify-center">
    <Icons 
      width="24" 
      height="24" 
      :icon-name="themeStore.theme === 'dark' ? 'moon' : 'sun'"
    />
  </button>
</template>
