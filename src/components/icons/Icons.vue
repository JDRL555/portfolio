<script setup lang="ts">
  import GithubIcon from './GithubIcon.vue'
  import LinkedinIcon from './LinkedinIcon.vue'
  import DocumentIcon from './DocumentIcon.vue'

  type IconName = 'github' | 'linkedin' | 'document'

  const props = defineProps<{
    width: string;
    height: string;
    iconName: IconName;
  }>();

  const iconMap = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    document: DocumentIcon
  }

  const currentIcon = iconMap[props.iconName as keyof typeof iconMap]
</script>

<template>
  <component 
    :is="currentIcon" 
    :width="props.width"
    :height="props.height"
  />
</template>