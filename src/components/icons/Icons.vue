<script setup lang="ts">
  import { computed } from 'vue';
  import {  
    IconFileText, 
  } from "@tabler/icons-vue";

  import { TECH_ICONS, type TechIconName } from "./Techs";

  type IconName = TechIconName | 'document';

  const props = defineProps<{
    width: string;
    height: string;
    iconName: IconName;
  }>();

  const iconMap = {
    ...TECH_ICONS,
    document: IconFileText,
  }

  const currentIcon = computed(() => iconMap[props.iconName as keyof typeof iconMap])
</script>

<template>
  <component 
    :is="currentIcon" 
    :width="props.width"
    :height="props.height"
    stroke-width="1.25"
  />
</template>