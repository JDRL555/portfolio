<script setup lang="ts">
import { ref, watch } from 'vue';
import { useThemeStore, useLanguageStore } from '../../stores';

const props = defineProps<{
  labels: any
}>();

const form = ref({
  email: '',
  fullName: '',
  consultType: '',
  businessType: '',
  details: ''
});

const store = useThemeStore()
const languageStore = useLanguageStore();

const buttonColors = ref(store.theme === 'dark' ? '!border-[var(--tertiary-color)] !text-[var(--tertiary-color)]' : '')

const submitForm = () => {

  const anyEmpty = Object.values(form.value).some(value => value === '');
  if(anyEmpty) { return; }
  
  // TU EMAIL PERSONAL AQUÍ (Destino)
  const myEmail = 'joshuleal3@gmail.com'; 

  const isEn = languageStore.language === 'en';

  const subject = isEn 
    ? `Consultation: ${form.value.consultType} - ${form.value.fullName}`
    : `Consulta: ${form.value.consultType} - ${form.value.fullName}`;
    
  const body = isEn
    ? `Hello, my name is ${form.value.fullName}.\n\n` +
      `I'm interested in ${form.value.consultType} for a ${form.value.businessType}.\n\n` +
      `Details:\n${form.value.details}\n\n` +
      `My contact email: ${form.value.email}`
    : `Hola, mi nombre es ${form.value.fullName}.\n\n` +
      `Estoy interesado en ${form.value.consultType} para un/a ${form.value.businessType}.\n\n` +
      `Detalles:\n${form.value.details}\n\n` +
      `Mi correo de contacto: ${form.value.email}`;

  window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const clearForm = () => {
  form.value = {
    email: '',
    fullName: '',
    consultType: '',
    businessType: '',
    details: ''
  };
};

watch(store, (newStore) => {
  buttonColors.value = newStore.theme === 'dark' ? '!border-[var(--tertiary-color)] !text-[var(--tertiary-color)]' : ''
});
</script>

<template>
  <form @submit.prevent="submitForm" class="bg-[var(--primary-color)] p-8 rounded-3xl border-2 border-[var(--primary-color)] shadow-lg transition-all duration-300 hover:-translate-y-2 w-full max-w-none">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
      
      <div class="flex flex-col">
        <label class="font-bold text-base md:text-lg text-[var(--text-color)] mb-2">
          {{ labels.full_name.label }} <span class="text-red-400">*</span>
        </label>
        <input 
          v-model="form.fullName"
          required
          type="text"
          minlength="12" 
          :placeholder="labels.full_name.placeholder"
          class="p-2 md:p-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--secondary-color)] text-sm md:text-lg"
        >
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-base md:text-lg text-[var(--text-color)] mb-2">
          {{ labels.email.label }} <span class="text-red-400">*</span>
        </label>
        <input 
          v-model="form.email"
          required
          type="email" 
          :placeholder="labels.email.placeholder"
          class="p-2 md:p-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--secondary-color)] text-sm md:text-lg"
        >
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-base md:text-lg text-[var(--text-color)] mb-2">
          {{ labels.consult_type.label }} <span class="text-red-400">*</span>
        </label>
        <select 
          v-model="form.consultType"
          required
          class="p-2 md:p-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)] text-sm md:text-lg"
        >
          <option value="" disabled selected>{{ labels.consult_type.placeholder }}</option>
          <option v-for="opt in labels.consult_type.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-base md:text-lg text-[var(--text-color)] mb-2">
          {{ labels.bussiness_type.label }} <span class="text-red-400">*</span>
        </label>
        <select 
          v-model="form.businessType"
          required
          class="p-2 md:p-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)] text-sm md:text-lg"
        >
          <option value="" disabled selected>{{ labels.bussiness_type.placeholder }}</option>
          <option v-for="opt in labels.bussiness_type.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <label class="font-bold text-base md:text-lg text-[var(--text-color)] mb-2">
        {{ labels.consult_details.label }} <span class="text-red-400">*</span>
      </label>
      <textarea 
        v-model="form.details"
        required
        rows="4"
        :placeholder="labels.consult_details.placeholder"
        class="p-2 md:p-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--secondary-color)] resize-none text-sm md:text-lg"
      ></textarea>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mt-8">
      <button 
        @click="submitForm"
        class="px-8 py-3 rounded-xl bg-orange-300 text-gray-800 font-bold hover:bg-orange-400 transition-colors shadow-md order-1 md:order-2"
      >
        {{ labels.buttons.submit }}
      </button>
      <button 
        @click="clearForm"
        class="px-6 py-3 rounded-xl transition-colors !bg-[var(--primary-color)] border-2 order-2 md:order-1"
        :class="buttonColors"
      >
        {{ labels.buttons.clear }}
      </button>
    </div>
  </form>
</template>