<script setup lang="ts">
import { ref } from "vue";
import { parseYears } from "../utils/parsers";
import Icons from "../components/icons/Icons.vue";
import ContactEmailForm from "../components/forms/EmailForm.vue";
import ContactWhatsAppForm from "../components/forms/WhatsAppForm.vue";

const { content } = defineProps<{
  content: {
    contact_to_me: {
      title: string;
      description: string;
      form: any;
    };
  };
}>();

// 'email' | 'whatsapp'
const contactMethod = ref<"email" | "whatsapp">("email");
</script>

<template>
  <section v-scroll-reveal class="py-10 px-4 md:px-12 w-full max-w-7xl mx-auto mb-24">
    <div class="flex flex-col w-full">
      <div class="w-full">
        <div>
          <div class="w-full">
            <h1 class="text-3xl md:text-5xl font-bold mb-6 text-[var(--title-color)]">
              {{ content.contact_to_me.title }}
            </h1>
            <p
              v-html="parseYears(content.contact_to_me.description)"
              class="text-lg md:text-xl mb-10 block opacity-80"
            ></p>
          </div>

          <div class="flex items-center justify-center m-auto gap-6 p-4">
            <!-- Toggle Icons -->
            <button
              @click="contactMethod = 'email'"
              class="p-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center w-24 h-24"
              :class="
                contactMethod === 'email'
                  ? 'shadow-inner'
                  : '!bg-transparent !text-[var(--secondary-color)] !border-none'
              "
            >
              <Icons width="100%" height="100%" icon-name="email" />
            </button>

            <button
              @click="contactMethod = 'whatsapp'"
              class="p-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center w-24 h-24"
              :class="
                contactMethod === 'whatsapp'
                  ? 'shadow-inner'
                  : '!bg-transparent !text-[var(--secondary-color)] !border-none'
              "
            >
              <Icons width="100%" height="100%" icon-name="whatsapp" />
            </button>
          </div>
        </div>

        <div class="mt-5 w-full">
          <Transition name="fade" mode="out-in">
            <ContactEmailForm
              v-if="contactMethod === 'email'"
              :labels="content.contact_to_me.form"
              class="w-full"
            />
            <ContactWhatsAppForm v-else :labels="content.contact_to_me.form" class="w-full" />
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
