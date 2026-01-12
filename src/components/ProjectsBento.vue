<script setup lang="ts">
import { computed } from 'vue'
import Icons from './icons/Icons.vue'
import { TECH_ICONS, type TechIconName } from './icons/Techs/Techs'

const props = defineProps<{
  projects: {
    title: string
    description: string
    technologies?: string[]
    img?: string
  }[]
  filter: Set<string>
  not_found: string
}>()

const filteredProjects = computed(() => {
  if (props.filter.size === 0) {
    return props.projects
  }
  return props.projects.filter(project => {
    if (!project.technologies) return false
    return project.technologies.some(tech => props.filter.has(tech.toLowerCase()))
  })
})

const getIconName = (tech: string): TechIconName | null => {
  const lower = tech.toLowerCase()
  if (lower in TECH_ICONS) {
    return lower as TechIconName
  }
  return null
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-5">
    <div 
      v-for="(project, index) in filteredProjects" 
      :key="project.title"
      class="bg-blue-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
      :class="{ 'md:col-span-2 md:flex-row': index === 0 && filteredProjects.length > 1 }"
    >
      <!-- Image Container -->
      <div 
        class="overflow-hidden relative"
        :class="[
          (index === 0 && filteredProjects.length > 1) ? 'w-full md:w-1/2 h-64 md:h-auto' : 'w-full h-48'
        ]"
      >
        <img 
          v-if="project.img" 
          :src="project.img" 
          :alt="project.title" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
        
        <!-- Overlay gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- Content Container -->
      <div 
        class="p-6 flex flex-col justify-between"
        :class="[
          (index === 0 && filteredProjects.length > 1) ? 'w-full md:w-1/2' : 'w-full flex-1'
        ]"
      >
        <div>
          <h3 class="text-2xl font-bold mb-3 text-blue-900">{{ project.title }}</h3>
          <p class="text-slate-700 mb-4 text-sm leading-relaxed" v-html="project.description"></p>
        </div>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-3 mt-auto pt-4 border-t border-blue-100">
          <div 
            v-for="tech in project.technologies" 
            :key="tech"
            class="text-slate-600 hover:text-[var(--primary-color)] transition-colors"
            :title="tech"
          >
            <Icons 
              v-if="getIconName(tech)"
              :iconName="getIconName(tech)!" 
              width="28" 
              height="28" 
            />
            <span v-else class="text-xs font-bold px-2 py-1 bg-blue-100 rounded-md">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="col-span-full text-center py-10 text-xl text-white opacity-80">
      {{ not_found }}
    </div>
  </div>
</template>
