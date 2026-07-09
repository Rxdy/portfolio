<script setup lang="ts">
import type { Component } from 'vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'

defineProps<{
  /** Composant d'icône RemixIcon */
  icon: Component
  /** Titre de la capacité */
  title: string
  /** Éléments listés */
  items: string[]
}>()
</script>

<template>
  <article class="capability-card">
    <span class="capability-card__icon">
      <component :is="icon" />
    </span>
    <BaseHeading :level="3">{{ title }}</BaseHeading>
    <ul class="capability-card__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>

<style scoped>
.capability-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  height: 100%;
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.capability-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

.capability-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  color: #fff;
}

.capability-card__icon :deep(svg) {
  width: 1.4rem;
  height: 1.4rem;
  fill: currentColor;
}

.capability-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.capability-card__list li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
}

.capability-card__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-secondary);
}
</style>
