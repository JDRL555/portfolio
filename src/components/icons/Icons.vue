<script setup lang="ts">
  import { computed } from 'vue';

  import { OTHER_ICONS, type OtherIconName } from './Other'
  import { TECH_ICONS, type TechIconName } from "./Techs";
  import { COMPANY_ICONS, type CompanyIcon } from "./Companies";

  type IconName = TechIconName | CompanyIcon | OtherIconName;

  const props = defineProps<{
    width: string;
    height: string;
    iconName: IconName;
  }>();

  const iconMap = {
    ...TECH_ICONS,
    ...COMPANY_ICONS,
    ...OTHER_ICONS,
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