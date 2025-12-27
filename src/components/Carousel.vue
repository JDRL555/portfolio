<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore, useCarouselStore } from '../stores'
import en from '../data/site-en.json'
import es from '../data/site-es.json'
import { parseYears } from '../utils/parsers.ts'

const languageStore = useLanguageStore()
const carousel = useCarouselStore()

const slides = computed(() => (languageStore.language === 'es' ? es.slide : en.slide))
const total = computed(() => slides.value.length)

function next() {
  carousel.nextSlide(total.value)
}

function prev() {
  carousel.prevSlide(total.value)
}

setInterval(() => {
  if(carousel.slide !== total.value - 1) {
    next()
  } else {
    carousel.setSlide(0)
  }
}, 5000);
</script>

<template>
  <div class="relative w-screen overflow-hidden" role="region" aria-label="Image carousel">
    <!-- Carrusel track -->
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{
        width: `${total * 100}%`,
        transform: `translateX(-${carousel.slide * (100 / total)}%)`
      }"
    >
      <!-- Slides -->
      <div
        v-for="(slide, i) in slides"
        :key="slide.button"
        class="shrink-0 snap-start relative"
        :style="{ width: `${100 / total}%` }"
        :data-index="i"
        :aria-hidden="i !== carousel.slide"
      >
        <img :src="slide.image" alt="" class="w-full h-auto object-cover" />

        <div
          class="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10"
          :style="{ backgroundColor: 'var(--slide-background)', color: 'var(--slide-color)' }"
        >
          <h2 class="text-6xl text-white font-bold mb-7">{{ slide.title }}</h2>
          <p class="text-2xl w-2/3 mb-7 text-white" v-html="parseYears(slide.description)"></p>
          <button class="bg-[var(--tertiary-color)] text-[var(--button-color)] hover:bg-[var(--tertiary-hover-color)] px-6 py-2 rounded font-semibold">
            {{ slide.button }}
          </button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div
      class="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer ml-3 text-white hover:text-[var(--slide-color)] text-6xl z-20 transition ease-in-out duration-500 select-none"
      @click="prev"
    >
      <
    </div>

    <div
      class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer mr-3 text-white hover:text-[var(--slide-color)] text-6xl z-20 transition ease-in-out duration-500 select-none"
      @click="next"
    >
      >
    </div>
  </div>
</template>