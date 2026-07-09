<script setup lang="ts">
defineProps<{
  /** Libellé affiché dans le tag */
  label: string
}>()
</script>

<template>
  <span class="base-tag">{{ label }}</span>
</template>

<style scoped>
.base-tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
