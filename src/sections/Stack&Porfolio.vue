<script lang="ts" setup>
  import { ref } from 'vue'
  import Icons from '../components/icons/Icons.vue'
  import { 
    LANGUAGES, 
    FRONTEND, 
    BACKEND, 
    DATABASE, 
    OTHER_TOOLS, 
    type TechIconName 
  } from '../components/icons/Techs'
  import { IconX } from '@tabler/icons-vue'
  import ProjectsBento from '../components/ProjectsBento.vue'
  
  const { content } = defineProps<{
    content: {
      stack_and_portfolio: {
        title: string;
        items: string[];
        projects: ({
            title: string;
            description: string;
            technologies: string[];
        } | {
            title: string;
            description: string;
            technologies?: undefined;
        })[];
    };
    }
  }>()

  const techGroups: Record<string, Record<string, any>> = {
    'Languages': LANGUAGES,
    'Frontend': FRONTEND,
    'Backend': BACKEND,
    'Databases': DATABASE,
    'Other Tools': OTHER_TOOLS
  }

  const selectedTechs = ref<Set<string>>(new Set())
  const hoveredCategory = ref<string | null>(null)

  const isCategorySelected = (category: string) => {
    const group = techGroups[category]
    if (!group) return false
    return Object.keys(group).some(tech => selectedTechs.value.has(tech))
  }

  const toggleTech = (tech: string) => {
    if (selectedTechs.value.has(tech)) {
      selectedTechs.value.delete(tech)
    } else {
      selectedTechs.value.add(tech)
    }
  }

  const clearCategory = (category: string, event: Event) => {
    event.stopPropagation()
    const group = techGroups[category]
    if (!group) return
    Object.keys(group).forEach(tech => selectedTechs.value.delete(tech))
  }

</script>

<template>
  <section class="m-15">
    <div class="flex items-center justify-between gap-12 w-full">
      <div class="w-full ml-5">
        <h1 class="text-5xl font-bold mb-8">{{ content.stack_and_portfolio.title }}</h1>
        <div class="pt-5 flex justify-between w-full flex-wrap">
          <div 
            v-for="item in content.stack_and_portfolio.items" 
            :key="item"
            class="relative group"
            @mouseenter="hoveredCategory = item"
            @mouseleave="hoveredCategory = null"
          >
            <button 
              :class="[
                'px-4 py-2 rounded-full mr-2 mb-2 transition flex items-center gap-2',
                isCategorySelected(item) 
                  ? 'bg-[var(--tertiary-color)] text-[var(--button-color)]' 
                  : '!bg-transparent !border-none !text-white hover:!bg-[var(--primary-color-dark)]'
              ]"
            >
              {{ item }}
              <IconX 
                v-if="isCategorySelected(item)" 
                size="16" 
                class="cursor-pointer hover:text-red-500"
                @click="(e: Event) => clearCategory(item, e)"
              />
            </button>

            <!-- Popover -->
            <div 
              v-if="hoveredCategory === item"
              class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-4 mt-2 p-4 bg-[var(--tertiary-color)] rounded-xl shadow-xl z-10 min-w-[200px]"
            >
              <!-- Arrow -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-[var(--tertiary-color)]"></div>
              
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="(_icon, name) in techGroups[item]"
                  :key="name"
                  @click="toggleTech(name as string)"
                  :class="[
                    '!p-2 !rounded-lg transition-colors flex items-center justify-center !bg-transparent !border-none !m-0 !min-w-0 !min-h-0',
                    selectedTechs.has(name as string) 
                      ? '!text-[var(--primary-color)]' 
                      : 'hover:!bg-[var(--tertiary-hover-color)] !text-black'
                  ]"
                  :title="name as string"
                >
                  <Icons 
                    :iconName="name as TechIconName" 
                    width="80" 
                    height="80" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <ProjectsBento 
          :projects="content.stack_and_portfolio.projects" 
          :filter="selectedTechs" 
        />
      </div>
    </div>
  </section>
</template>