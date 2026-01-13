import { defineStore } from 'pinia'

export const useCarouselStore = defineStore('carousel', {
  state: () => ({
    slide: 0
  }),
  actions: {
    nextSlide(total: number) {
      if (typeof this.slide !== 'number') this.slide = 0;
      this.slide = (this.slide + 1) % total
    },
    prevSlide(total: number) {
      if (typeof this.slide !== 'number') this.slide = 0;
      this.slide = (this.slide - 1 + total) % total
    },
    setSlide(index: number) {
      this.slide = index
    }
  }
})