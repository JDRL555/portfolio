<script setup lang="ts">
import { ref } from 'vue';
import { parseYears } from '../utils/parsers';
import Icons from '../components/icons/Icons.vue';
import ContactEmailForm from '../components/forms/EmailForm.vue';
import ContactWhatsAppForm from '../components/forms/WhatsAppForm.vue';

const { content } = defineProps<{
  content: {
    contact_to_me: {
      title: string,
      description: string,
      form: any
    }
  }
}>()

// 'email' | 'whatsapp'
const contactMethod = ref<'email' | 'whatsapp'>('email');

</script>

<template>
  <section class="m-15 mb-24">
    <div class="flex flex-col w-full">
      <div class="ml-5">
        <div class="flex justify-between items-start">
          <div class="w-full md:w-[70%]">
            <h1 class="text-5xl font-bold mb-6 text-[var(--title-color)]">{{ content.contact_to_me.title }}</h1>
            <p v-html="parseYears(content.contact_to_me.description)" class="text-xl mb-10 block max-w-4xl opacity-80"></p>
          </div>
        
          <div class="hidden md:flex gap-6 items-center bg-white p-4 rounded-full shadow-md">
             <!-- Toggle Icons -->
             <button 
              @click="contactMethod = 'email'"
              class="p-3 rounded-full transition-all duration-300 hover:scale-110"
              :class="contactMethod === 'email' ? 'bg-[var(--secondary-color)] text-white shadow-inner' : 'bg-gray-100'"
            >
              <Icons width="40" height="40" icon-name="email" /> <!-- Asumiendo que añadas un icono 'email' -->
            </button>

            <button 
              @click="contactMethod = 'whatsapp'"
              class="p-3 rounded-full transition-all duration-300 hover:scale-110"
              :class="contactMethod === 'whatsapp' ? 'bg-[#25D366] text-white shadow-inner' : 'bg-gray-100'"
            >
              <Icons width="40" height="40" icon-name="whatsapp" /> <!-- Asumiendo que añadas un icono 'whatsapp' -->
            </button>
          </div>
        </div>

        <!-- Mobile controls (duplicated for responsivness if needed, or simple stacking) -->
        <div class="flex md:hidden gap-6 justify-center mb-10">
           <button 
              @click="contactMethod = 'email'"
              class="p-3 rounded-full border-2"
              :class="contactMethod === 'email' ? 'border-[var(--secondary-color)] bg-blue-50' : 'border-gray-200'"
            >
              <Icons width="40" height="40" icon-name="email" />
            </button>

            <button 
              @click="contactMethod = 'whatsapp'"
              class="p-3 rounded-full border-2"
              :class="contactMethod === 'whatsapp' ? 'border-[#25D366] bg-green-50' : 'border-gray-200'"
            >
              <Icons width="40" height="40" icon-name="whatsapp" />
            </button>
        </div>

        <div class="mt-5">
          <Transition name="fade" mode="out-in">
            <ContactEmailForm 
              v-if="contactMethod === 'email'" 
              :labels="content.contact_to_me.form"
            />
            <ContactWhatsAppForm 
              v-else 
              :labels="content.contact_to_me.form"
            />
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>