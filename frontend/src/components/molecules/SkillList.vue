<script setup lang="ts">
import BaseTag from '@/components/atoms/BaseTag.vue'

defineProps<{
  skills: string[]
}>()
</script>

<template>
  <ul class="skill-list">
    <li v-for="skill in skills" :key="skill">
      <BaseTag :label="skill" />
    </li>
  </ul>
</template>

<style scoped>
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  list-style: none;
}
</style>
