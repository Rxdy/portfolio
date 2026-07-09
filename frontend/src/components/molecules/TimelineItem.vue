<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'

defineProps<{
  /** Intitulé du diplôme / de l'étape */
  title: string
  /** École, organisme ou ville */
  place: string
  /** Année ou période (ex: "2023" ou "2021 — 2023") */
  period: string
  /** Détail optionnel (missions, contexte) */
  description?: string
}>()
</script>

<template>
  <li class="timeline-item">
    <div class="timeline-item__marker" aria-hidden="true"></div>
    <div class="timeline-item__content">
      <span class="timeline-item__period">{{ period }}</span>
      <BaseHeading :level="3">{{ title }}</BaseHeading>
      <p class="timeline-item__place">{{ place }}</p>
      <p v-if="description" class="timeline-item__description">{{ description }}</p>
    </div>
  </li>
</template>

<style scoped>
.timeline-item {
  position: relative;
  padding-left: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-left: 2px solid var(--color-border);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item__marker {
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-bg);
}

.timeline-item__content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.timeline-item__period {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.timeline-item__place {
  color: var(--color-text-muted);
}

.timeline-item__description {
  margin-top: 0.35rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
</style>
