<script setup lang="ts">
import { computed, ref } from 'vue'
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

// Touch/Swipe Logic
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0]?.screenX || 0
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0]?.screenX || 0
  handleSwipe()
}

const handleSwipe = () => {
  if (touchEndX.value < touchStartX.value - 50) {
    // Swipe Left -> Next
    next()
  }
  if (touchEndX.value > touchStartX.value + 50) {
    // Swipe Right -> Prev
    prev()
  }
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
  <div 
    class="relative w-full overflow-hidden animate-slide-down-fade" 
    role="region" 
    aria-label="Image carousel"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
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
        <img :src="slide.image" alt="" class="w-full h-screen object-cover" />

        <div
          class="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10"
          :style="{ backgroundColor: 'var(--slide-background)', color: 'var(--slide-color)' }"
        >
          <h2 class="text-3xl sm:text-4xl md:text-6xl text-white font-bold mb-4 md:mb-7">{{ slide.title }}</h2>
          <p class="text-base sm:text-xl md:text-2xl w-full md:w-2/3 mb-4 md:mb-7 text-white" v-html="parseYears(slide.description)"></p>
          <a 
            :href="slide.link"
            :target="slide.target_blank ? '_blank' : '_self'"
            class="bg-[var(--tertiary-color)] !text-[var(--button-color)] hover:bg-[var(--tertiary-hover-color)] px-4 py-2 md:px-6 md:py-2 rounded-2xl font-semibold text-sm md:text-base !no-underline transition-colors duration-300"
          >
            {{ slide.button }}
          </a>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div
      class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 cursor-pointer ml-1 md:ml-3 text-white hover:text-[var(--slide-color)] text-4xl md:text-6xl z-20 transition ease-in-out duration-500 select-none"
      @click="prev"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-12 h-12 md:w-16 md:h-16">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </div>

    <div
      class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer mr-1 md:mr-3 text-white hover:text-[var(--slide-color)] text-4xl md:text-6xl z-20 transition ease-in-out duration-500 select-none"
      @click="next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-12 h-12 md:w-16 md:h-16">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  </div>
</template>