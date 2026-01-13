<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <section v-scroll-reveal class="py-10 px-4 md:px-12 w-full overflow-hidden">
    <div class="flex flex-col items-start w-full max-w-7xl mx-auto">
      <div class="w-full">
        <h1 class="text-3xl md:text-5xl font-bold mb-8 ml-2 md:ml-5 break-words">{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </section>
</template>