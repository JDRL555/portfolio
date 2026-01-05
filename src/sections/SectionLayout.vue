<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <section class="m-15">
    <div class="flex items-center justify-between gap-12 w-full">
      <div class="w-full ml-5">
        <h1 class="text-5xl font-bold mb-8">{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </section>
</template>