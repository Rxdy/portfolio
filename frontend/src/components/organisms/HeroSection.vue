<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
</script>

<template>
  <section id="top" class="hero">
    <p class="hero__eyebrow">Bonjour, je suis</p>
    <BaseHeading :level="1">Rudy Alves</BaseHeading>
    <p class="hero__subtitle">
      Développeur web passionné. Ça fait des années que je crée des projets — surtout des
      applications web et des APIs — avec Vue, TypeScript et Node.js. J'aime partir d'une idée et
      la voir prendre vie.
    </p>
    <div class="hero__actions">
      <BaseButton href="#expertise">Voir mon savoir-faire</BaseButton>
      <BaseButton variant="secondary" href="#contact">Me contacter</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-xl) 0;
}

.hero__eyebrow {
  color: var(--color-primary);
  font-weight: 600;
}

.hero__subtitle {
  max-width: 40rem;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-sm);
}
</style>
