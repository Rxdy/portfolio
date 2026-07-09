<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
</script>

<template>
  <RouterLink class="journey-teaser" :to="{ name: 'journey' }">
    <div>
      <BaseHeading :level="3">Un parcours un peu atypique</BaseHeading>
      <p class="journey-teaser__text">
        Entre mes diplômes, il y a eu la vie active et la création d'une famille. Une étape que
        j'assume et qui m'a aussi beaucoup appris.
      </p>
      <span class="journey-teaser__more">En savoir plus →</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.journey-teaser {
  display: block;
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-secondary);
  border-radius: var(--radius);
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.journey-teaser:hover {
  border-color: var(--color-secondary);
  transform: translateY(-3px);
}

.journey-teaser__text {
  margin-top: var(--space-xs);
  color: var(--color-text-muted);
  max-width: 44rem;
}

.journey-teaser__more {
  display: inline-block;
  margin-top: var(--space-sm);
  color: var(--color-primary);
  font-weight: 600;
}
</style>
