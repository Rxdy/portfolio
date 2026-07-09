<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import SchoolsSection from '@/components/organisms/SchoolsSection.vue'
import CompaniesSection from '@/components/organisms/CompaniesSection.vue'
</script>

<template>
  <main class="edu-detail page">
    <RouterLink class="edu-detail__back" :to="{ path: '/', hash: '#education' }">
      ← Retour au parcours
    </RouterLink>

    <header class="edu-detail__header">
      <BaseHeading :level="1">Mes écoles &amp; entreprises</BaseHeading>
      <p class="edu-detail__lead">
        Le détail des établissements qui ont jalonné ma formation et des structures dans lesquelles
        j'ai travaillé.
      </p>
    </header>

    <SchoolsSection />
    <CompaniesSection />
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.edu-detail {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.edu-detail__back {
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color 0.18s ease;
}

.edu-detail__back:hover {
  color: var(--color-primary);
}

.edu-detail__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.edu-detail__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}
</style>
