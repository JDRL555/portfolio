<script setup lang="ts">
  import { parseYears } from '../utils/parsers';
  import Icons from '../components/icons/Icons.vue';
  import Modal from '../components/Modal.vue';
  import SectionLayout from './SectionLayout.vue';

  const { content } = defineProps<{
    content: {
      who_i_am: {
        title: string,
        description: string[],
        modal?: {
          contents: {
            title: string,
            content: string,
            image: string
          }[]
        }
      }
    }
  }>()

  import { onMounted, onBeforeUnmount, ref as vueRef } from 'vue'

  const open = vueRef(false);
  const textContainer = vueRef<HTMLElement | null>(null)

  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    if (target.closest && target.closest('a.open-modal')) {
      e.preventDefault()
      open.value = true
    }
  }

  const firstContent = content.who_i_am.modal?.contents[0] || { title: '', content: '', image: '' };
  const contentWithoutFirst = content.who_i_am.modal?.contents.slice(1);

  onMounted(() => {
    if (textContainer.value) textContainer.value.addEventListener('click', handleClick)
  })

  onBeforeUnmount(() => {
    if (textContainer.value) textContainer.value.removeEventListener('click', handleClick)
  })
</script>

<template>
  <section v-scroll-reveal class="py-10 px-4 md:px-12 w-full max-w-7xl mx-auto">
    <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full">
      <div class="w-full lg:w-[60%]">
        <h1 class="text-3xl md:text-5xl font-bold mb-8">{{ content.who_i_am.title }}</h1>
        <!-- <div class="flex gap-4">
          <ThemeToggle />
          <LanguageToggle />
        </div> -->
  
        <div ref="textContainer">
          <p 
            v-for="desc in content.who_i_am.description" 
            v-html="parseYears(desc)"
            class="text-lg md:text-xl mb-5 leading-relaxed" 
            :key="desc"
          ></p>
        </div>

      </div>

      <div class="w-full lg:w-[40%] flex flex-col items-center">
        <img 
          src="../assets/images/Foto perfil.jpeg" 
          alt="Profile Picture"
          class="rounded-full w-48 md:w-[20rem] border-4 border-[var(--secondary-color)] mb-5"
        >
        <div class="flex gap-6 md:gap-10 pt-2 justify-center">
          <a href="https://github.com/JDRL555" target="blank" class="hover:scale-110 transition-transform">
            <Icons 
              width="50"
              height="50"
              icon-name="github"
            />
          </a>

          <a href="https://www.linkedin.com/in/joshua-rodríguez/" target="blank" class="hover:scale-110 transition-transform">
            <Icons 
              width="50"
              height="50"
              icon-name="linkedin"
            />
          </a>

          <a href="https://drive.google.com/file/d/1zIP6r68486z23dqkgtxYng2ibKsSD8Uj/view?usp=sharing" target="blank" class="hover:scale-110 transition-transform">
            <Icons 
              width="50"
              height="50"
              icon-name="document"
            />
          </a>
        </div>
      </div>
    </div>
  </section>

  <Modal v-model:open="open">
    <div
      class="flex flex-col md:flex-row items-center gap-5 mb-10"
    >
      <img :src="firstContent.image" alt="modal images" class="w-full md:w-[20rem] rounded-3xl object-cover">
      <div>
        <h2 class="text-2xl md:text-4xl font-bold mb-5 text-[var(--modal-text)]">
          {{ firstContent.title }}
        </h2>
        <p v-html="firstContent.content" class="text-sm md:text-base"></p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div v-for="content in contentWithoutFirst">
        <img :src="content.image" alt="modal images" class="w-full h-48 md:h-[20rem] object-cover rounded-3xl mb-4">
        <h2 class="text-xl md:text-2xl font-bold mb-3 text-[var(--modal-text)]">
          {{ content.title }}
        </h2>
        <p v-html="content.content" class="text-sm md:text-base"></p>
      </div>
    </div>
  </Modal>
  
</template>