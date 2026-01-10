<script setup lang="ts">
import { ref } from 'vue';

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

const submitForm = () => {

  const anyEmpty = Object.values(form.value).some(value => value === '');
  if(anyEmpty) { return; }
  
  // TU EMAIL PERSONAL AQUÍ (Destino)
  const myEmail = 'joshuleal3@gmail.com'; 

  const subject = `Consulta: ${form.value.consultType} - ${form.value.fullName}`;
  const body = `Nombre: ${form.value.fullName}\n` +
    `Correo del cliente: ${form.value.email}\n` +
    `Tipo de negocio: ${form.value.businessType}\n` +
    `Detalles:\n${form.value.details}`;

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
</script>

<template>
  <form @submit.prevent="submitForm" class="bg-[var(--primary-color)] p-8 rounded-3xl border-2 border-[var(--primary-color)] shadow-lg transition-all duration-300 hover:-translate-y-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2">
          {{ labels.full_name.label }} <span class="text-red-400">*</span>
        </label>
        <input 
          v-model="form.fullName"
          required
          type="text"
          minlength="12" 
          :placeholder="labels.full_name.placeholder"
          class="p-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--secondary-color)]"
        >
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2">
          {{ labels.email.label }} <span class="text-red-400">*</span>
        </label>
        <input 
          v-model="form.email"
          required
          type="email" 
          :placeholder="labels.email.placeholder"
          class="p-3 rounded-xl border text-lg border-gray-300 outline-none focus:border-[var(--secondary-color)]"
        >
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2">
          {{ labels.consult_type.label }} <span class="text-red-400">*</span>
        </label>
        <select 
          v-model="form.consultType"
          required
          class="p-3 rounded-xl border text-lg border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)]"
        >
          <option value="" disabled selected>{{ labels.consult_type.placeholder }}</option>
          <option v-for="opt in labels.consult_type.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2">
          {{ labels.bussiness_type.label }} <span class="text-red-400">*</span>
        </label>
        <select 
          v-model="form.businessType"
          required
          class="p-3 rounded-xl border text-lg border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)]"
        >
          <option value="" disabled selected>{{ labels.bussiness_type.placeholder }}</option>
          <option v-for="opt in labels.bussiness_type.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <label class="font-bold text-lg text-[var(--text-color)] mb-2">
        {{ labels.consult_details.label }} <span class="text-red-400">*</span>
      </label>
      <textarea 
        v-model="form.details"
        required
        rows="4"
        :placeholder="labels.consult_details.placeholder"
        class="p-3 rounded-xl border text-lg border-gray-300 outline-none focus:border-[var(--secondary-color)] resize-none"
      ></textarea>
    </div>

    <div class="flex gap-4 mt-8">
      <button 
        @click="clearForm"
        class="px-6 py-3 rounded-xl transition-colors !bg-[var(--primary-color)] border-2 !border-[var(--tertiary-color)] !text-[var(--tertiary-color)]"
      >
        {{ labels.buttons.clear }}
      </button>
      <button 
        @click="submitForm"
        class="px-8 py-3 rounded-xl bg-orange-300 text-gray-800 font-bold hover:bg-orange-400 transition-colors shadow-md"
      >
        {{ labels.buttons.submit }}
      </button>
    </div>
  </form>
</template>