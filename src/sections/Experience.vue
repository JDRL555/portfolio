<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '../components/icons/Icons.vue'
import { TECH_ICONS, type TechIconName } from '../components/icons/Techs/Techs'
import { useLanguageStore } from '../stores'
import SectionLayout from './SectionLayout.vue'
import { COMPANY_ICONS, type CompanyIcon } from '../components/icons/Companies'

const props = defineProps<{
  content: any
}>()

const languageStore = useLanguageStore()
const activeIndex = ref(1)

const experiences = computed(() => props.content.experience)

const selectCard = (index: number) => {
  activeIndex.value = index
}

const getCardStyle = (index: number) => {
  const diff = index - activeIndex.value
  
  // Active card
  if (diff === 0) {
    return {
      transform: 'translateX(0) scale(1)',
      zIndex: 20,
      opacity: 1,
      filter: 'none'
    }
  }
  
  // Cards to the right
  if (diff > 0) {
    return {
      transform: `translateX(${diff * 60 + 40}%) scale(${1 - diff * 0.1})`,
      zIndex: 20 - diff,
      opacity: 1 - diff * 0.2,
      filter: 'grayscale(100%) brightness(80%)'
    }
  }
  
  // Cards to the left
  if (diff < 0) {
    return {
      transform: `translateX(${diff * 60 - 40}%) scale(${1 + diff * 0.1})`,
      zIndex: 20 + diff,
      opacity: 1 + diff * 0.2,
      filter: 'grayscale(100%) brightness(80%)'
    }
  }
}

const getMobileCardStyle = (index: number) => {
  const diff = index - activeIndex.value
  
  // Active card
  if (diff === 0) {
    return {
      transform: 'translateY(0) scale(1)',
      zIndex: 20,
      opacity: 1,
      filter: 'none'
    }
  }
  
  // Cards below
  if (diff > 0) {
    return {
      transform: `translateY(${diff * 60 + 35}px) scale(${1 - diff * 0.05})`,
      zIndex: 20 - diff,
      opacity: 1 - diff * 0.2,
      filter: 'grayscale(100%) brightness(80%)'
    }
  }
  
  // Cards above
  if (diff < 0) {
    return {
      transform: `translateY(${diff * 60 - 35}px) scale(${1 + diff * 0.05})`,
      zIndex: 20 + diff,
      opacity: 1 + diff * 0.2,
      filter: 'grayscale(100%) brightness(80%)'
    }
  }
}

const normalizeTech = (tech: string): TechIconName | null => {
  const map: Record<string, string> = {
    'TailwindCSS': 'tailwind',
    'VueJS': 'vue',
    'NextJS': 'nextjs',
    'Excel': 'excel',
    'Make': 'make',
    'MySQL': 'mysql',
    'TypeScript': 'typescript',
    'React': 'react',
    'Express': 'javascript', // Fallback for now
    'MongoDB': 'mongodb',
    'Python': 'python',
    'Flask': 'flask'
  }
  
  const normalized = map[tech] || tech.toLowerCase()
  if (normalized in TECH_ICONS) {
    return normalized as TechIconName
  }
  return null
}

const getIconName = (tech: string): CompanyIcon => {
  const normalized = tech.toLowerCase().replace(/\s+/g, '_')
  if (normalized in COMPANY_ICONS) {
    return normalized as CompanyIcon
  }
  return "kunaisoft"
}

const title = computed(() => languageStore.language === 'en' ? 'Experience' : 'Experiencia')
</script>

<template>
  <SectionLayout :title="title">
    <!-- Desktop Card Deck -->
    <div class="hidden md:flex relative h-[650px] w-full max-w-6xl mx-auto items-center justify-center perspective-1000 pt-10">
      <div 
        v-for="(exp, index) in experiences"
        :key="index"
        class="absolute w-[450px] bg-white rounded-3xl shadow-xl p-8 cursor-pointer transition-all duration-500 ease-out border border-blue-100 flex flex-col h-[600px]"
        :style="getCardStyle(Number(index))"
        @click="selectCard(Number(index))"
      >
        <!-- Header -->
        <div class="text-[var(--modal-text)]">
          <Icons 
            :iconName="getIconName(exp.company.name)" 
            width="100%" 
            height="10rem" 
          />
        </div>
        
        <h4 class="text-2xl font-bold text-[var(--modal-text)] mt-2 mb-2 text-center">{{ exp.job_title }}</h4>

        <p class="text-sm text-slate-500 font-medium text-center mb-4">{{ exp.period }}</p>
        
        <!-- Body -->
        <div class="flex-1 flex flex-col">
          
          <ul class="space-y-3 mb-6 flex-1">
            <li 
              v-for="(detail, i) in exp.details" 
              :key="i"
              class="text-slate-600 text-md leading-relaxed flex items-start gap-2"
            >
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
              <span v-html="detail"></span>
            </li>
          </ul>

          <!-- Footer / Techs -->
          <div class="pt-6 border-t border-slate-100 flex flex-wrap gap-4 justify-center">
            <div 
              v-for="tech in exp.technologies" 
              :key="tech"
              class="text-slate-400 hover:text-[var(--primary-color)] transition-colors"
              :title="tech"
            >
              <Icons 
                v-if="normalizeTech(tech)"
                :iconName="normalizeTech(tech)!" 
                width="28" 
                height="28" 
              />
              <span v-else class="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Stack -->
    <div class="flex md:hidden relative h-[720px] w-full px-2 items-center justify-center perspective-1000">
      <div 
        v-for="(exp, index) in experiences"
        :key="`mobile-${index}`"
        class="absolute w-full max-w-[350px] bg-white rounded-3xl shadow-lg p-6 border border-blue-100 flex flex-col h-[480px] transition-all duration-500 ease-out"
        :style="getMobileCardStyle(Number(index))"
        @click="selectCard(Number(index))"
      >
        <!-- Header -->
        <div class="text-[var(--modal-text)] mb-4">
          <Icons 
            :iconName="getIconName(exp.company.name)" 
            width="100%" 
            height="6rem" 
          />
        </div>
        
        <h4 class="text-xl font-bold text-[var(--modal-text)] mb-1 text-center">{{ exp.job_title }}</h4>
        <p class="text-sm text-slate-500 font-medium text-center mb-4">{{ exp.period }}</p>
        
        <div class="overflow-y-auto flex-1 mb-4 custom-scrollbar">
          <ul class="space-y-3">
            <li 
              v-for="(detail, i) in exp.details" 
              :key="i"
              class="text-slate-600 text-sm leading-relaxed flex items-start gap-2"
            >
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
              <span v-html="detail"></span>
            </li>
          </ul>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-wrap gap-3 justify-center">
          <div 
            v-for="tech in exp.technologies" 
            :key="tech"
            class="text-slate-400"
            :title="tech"
          >
            <Icons 
              v-if="normalizeTech(tech)"
              :iconName="normalizeTech(tech)!" 
              width="24" 
              height="24" 
            />
            <span v-else class="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </SectionLayout>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
