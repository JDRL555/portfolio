<script setup lang="ts">
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageToggle from "./LanguageToggle.vue";

const isExpanded = ref(false);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Who I Am?", href: "#who-i-am" },
  { label: "Stack & Portfolio", href: "#stack-portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact Me!", href: "#contact-me" },
];
</script>

<template>
  <div>
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
      :class="
        isExpanded
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      "
      @click="isExpanded = false"
    ></div>

    <!-- Sidebar -->
    <nav
      class="fixed left-0 top-0 h-full z-50 bg-[var(--primary-color)] text-[var(--secondary-color)] shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between py-12 overflow-hidden border-r border-[var(--primary-light-color)]"
      :class="isExpanded ? 'w-72 px-8' : 'w-10 cursor-pointer'"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
    >
      <!-- Collapsed State Indicator -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center gap-2"
        :class="
          isExpanded
            ? 'opacity-0 translate-x-10 pointer-events-none'
            : 'opacity-100'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-8 h-8 text-[var(--secondary-color)] slide-hint"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <!-- Navigation Links -->
      <div
        class="flex flex-col gap-8 mt-10 transition-opacity duration-200"
        :class="
          isExpanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'
        "
      >
        <ul class="flex flex-col gap-8">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              class="text-2xl font-bold no-underline hover:text-[var(--tertiary-color)] transition-all duration-200 block whitespace-nowrap border-l-4 border-transparent pl-2 hover:border-[var(--tertiary-color)] hover:translate-x-2"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Settings Section -->
      <div
        class="transition-opacity duration-200"
        :class="
          isExpanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'
        "
      >
        <div
          class="!bg-[var(--primary-color)] p-4 rounded-xl border border-[var(--secondary-color)]"
        >
          <h3
            class="font-bold text-lg mb-4 flex items-center gap-2 text-[var(--secondary-color)]"
          >
            <span class="text-xl">⚙️</span> Settings
          </h3>
          <div class="flex gap-3 justify-between">
            <ThemeToggle class="flex-1 justify-center flex" />
            <LanguageToggle class="flex-1 justify-center flex" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@keyframes slide-right {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

.slide-hint {
  animation: slide-right 1.5s ease-in-out infinite;
}
</style>
