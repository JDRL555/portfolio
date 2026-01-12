<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useCountryStore, useThemeStore } from "../../stores";
import { parseCountriesNumber } from "../../utils/parsers";
import type { FormattedCountry } from "../../services/CountriesAPI";

const props = defineProps<{
  labels: any;
}>();

const { countries } = useCountryStore();

const store = useThemeStore()
const buttonColors = ref(store.theme === 'dark' ? '!border-[var(--tertiary-color)] !text-[var(--tertiary-color)]' : '')
const dropdownColors = ref(store.theme === 'dark' ? 'bg-[var(--secondary-light-color)]' : 'bg-white')

const formatedCountries = parseCountriesNumber(countries);
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const selectedCountry = ref<FormattedCountry>(
  formatedCountries.length > 0
    ? (formatedCountries[0] as FormattedCountry)
    : { name: "", code: "", flag: "" }
);

const selectCountry = (country: FormattedCountry): void => {
  selectedCountry.value = country;
  isDropdownOpen.value = false;
};

const form = ref({
  phone: "",
  fullName: "",
  consultType: "",
  businessType: "",
  details: "",
});

const submitForm = () => {
  if (!form.value.phone || !form.value.fullName) return;

  // TU NÚMERO DE TELÉFONO PERSONAL AQUÍ (Destino)
  const myNumber = "584241234567"; // Reemplázalo con tu número real sin símbolos

  const message =
    `*New Contact Request*\n\n` +
    `*Name:* ${form.value.fullName}\n` +
    `*Client Phone:* ${selectedCountry.value?.code || ""} ${
      form.value.phone
    }\n` +
    `*Consult Type:* ${form.value.consultType}\n` +
    `*Business Type:* ${form.value.businessType}\n` +
    `*Details:* ${form.value.details}`;

  const url = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const clearForm = () => {
  form.value = {
    phone: "",
    fullName: "",
    consultType: "",
    businessType: "",
    details: "",
  };
};

watch(store, (newStore) => {
  buttonColors.value = newStore.theme === 'dark' ? '!border-[var(--tertiary-color)] !text-[var(--tertiary-color)]' : ''
  dropdownColors.value = newStore.theme === 'dark' ? 'bg-[var(--secondary-light-color)]' : 'bg-white'
});
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="bg-[var(--primary-color)] p-8 rounded-3xl border-2 border-[var(--primary-color)] shadow-lg transition-all duration-300 hover:-translate-y-2"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Phone Input with Country Code -->
      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2"
          >{{ labels.phone.label }} <span class="text-red-400">*</span></label
        >

        <div class="flex gap-2 relative">
          <!-- Custom Select Trigger -->
          <div
            @click="isDropdownOpen = !isDropdownOpen"
            ref="dropdownRef"
            class="flex items-center justify-between p-3 rounded-xl border border-gray-300 w-[160px] cursor-pointer select-none hover:border-[var(--secondary-color)]"
            :class="dropdownColors"
          >
            <div class="flex items-center gap-2">
              <img
                :src="selectedCountry.flag"
                class="w-6 h-4 object-cover rounded-sm"
                v-if="selectedCountry.flag"
              />
              <span class="text-lg font-medium text-gray-600">{{
                selectedCountry.code
              }}</span>
            </div>
            <!-- Arrow icon -->
            <span
              class="text-gray-500 text-xs transform transition-transform"
              :class="{ 'rotate-180': isDropdownOpen }"
              >▼</span
            >
          </div>

          <!-- Custom Dropdown Options -->
          <ul
            v-if="isDropdownOpen"
            class="absolute top-full left-0 mt-2 w-[180px] max-h-60 overflow-y-auto border border-gray-300 rounded-xl shadow-xl z-50 py-1"
            :class="dropdownColors"
          >
            <li
              v-for="c in formatedCountries"
              :key="c.code"
              @click="selectCountry(c)"
              class="flex items-center gap-3 px-3 py-2 group hover:bg-[var(--primary-light-color)] cursor-pointer transition-colors"
              :class="{
                'bg-[var(--primary-color)]': c.code === selectedCountry.code,
              }"
            >
              <img
                :src="c.flag"
                class="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <span
                class="text-sm group-hover:text-[var(--secondary-light-color)]"
                :class="
                  c.code === selectedCountry.code
                    ? 'text-[var(--secondary-color)]'
                    : 'text-gray-700'
                "
              >
                {{ c.name }}
              </span>
            </li>
          </ul>

          <input
            v-model="form.phone"
            required
            type="number"
            placeholder="4121234567"
            class="p-3 rounded-xl border text-lg border-gray-300 w-full outline-none focus:border-[var(--secondary-color)]"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2"
          >{{ labels.full_name.label }}
          <span class="text-red-400">*</span></label
        >
        <input
          v-model="form.fullName"
          required
          type="text"
          :placeholder="labels.full_name.placeholder"
          class="p-3 rounded-xl border text-lg border-gray-300 outline-none focus:border-[var(--secondary-color)]"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2"
          >{{ labels.consult_type.label }}
          <span class="text-red-400">*</span></label
        >
        <select
          v-model="form.consultType"
          required
          class="p-3 rounded-xl border text-lg border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)]"
        >
          <option value="" disabled selected>
            {{ labels.consult_type.placeholder }}
          </option>
          <option
            v-for="opt in labels.consult_type.options"
            :key="opt"
            :value="opt"
          >
            {{ opt }}
          </option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold text-lg text-[var(--text-color)] mb-2"
          >{{ labels.bussiness_type.label }}
          <span class="text-red-400">*</span></label
        >
        <select
          v-model="form.businessType"
          required
          class="p-3 rounded-xl border text-lg border-gray-300 bg-white outline-none focus:border-[var(--secondary-color)]"
        >
          <option value="" disabled selected>
            {{ labels.bussiness_type.placeholder }}
          </option>
          <option
            v-for="opt in labels.bussiness_type.options"
            :key="opt"
            :value="opt"
          >
            {{ opt }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <label class="font-bold text-lg text-[var(--text-color)] mb-2"
        >{{ labels.consult_details.label }}
        <span class="text-red-400">*</span></label
      >
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
        type="button"
        @click="clearForm"
        class="px-6 py-3 rounded-xl transition-colors !bg-[var(--primary-color)] border-2"
        :class="buttonColors"
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
