<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()


const isClosing = ref(false)

watch(() => props.open, (val, old) => {
  if (val) {
    isClosing.value = false
  } else if (old && !val) {
    isClosing.value = true
    setTimeout(() => {
      isClosing.value = false
    }, 500)
  }
})

const panelState = computed(() => {
  if (props.open && !isClosing.value) return 'modal-enter'
  if (!props.open && isClosing.value) return 'modal-exit'
  return 'modal-hidden'
})
</script>

<template>
  <div
    @click.self="emit('update:open', false)"
    :class="`fixed inset-0 bg-[var(--modal-bg)] flex items-center justify-center z-50 ${props.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`"
  >
    <div id="modal" :class="`bg-[var(--tertiary-color)] text-gray-700 font-normal rounded-lg shadow-lg p-16 w-[80%] max-h-[90%] overflow-y-auto ${panelState}`">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* Modal enter from above, exit to below, with fade */
.modal-enter {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.3s, opacity 0.35s ease;
}
.modal-exit {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.35s ease;
}
.modal-hidden {
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.35s ease;
}
</style>