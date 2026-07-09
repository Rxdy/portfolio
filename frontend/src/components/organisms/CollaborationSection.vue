<script setup lang="ts">
import { RiShakeHandsLine, RiRocketLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
</script>

<template>
  <section id="collaboration" class="collab">
    <BaseHeading :level="2">Collaboration</BaseHeading>

    <div class="collab__grid">
      <article class="collab__card">
        <span class="collab__icon"><RiShakeHandsLine /></span>
        <BaseHeading :level="3">Un binôme de confiance</BaseHeading>
        <p class="collab__text">
          Je travaille étroitement avec un ancien étudiant rencontré durant mon parcours. Nous
          partageons la même vision et la même exigence, et nous avançons ensemble sur des projets
          communs — chacun apportant sa complémentarité.
        </p>
      </article>

      <article class="collab__card">
        <span class="collab__icon"><RiRocketLine /></span>
        <BaseHeading :level="3">Créer une entreprise</BaseHeading>
        <p class="collab__text">
          Ensemble, nous envisageons de créer une entreprise pour répondre aux besoins des
          professionnels comme des particuliers : améliorer leurs solutions existantes ou en
          concevoir de nouvelles, adaptées à leurs usages.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.collab {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.collab__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.collab__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-secondary);
  border-radius: var(--radius);
}

.collab__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  color: #fff;
}

.collab__icon :deep(svg) {
  width: 1.4rem;
  height: 1.4rem;
  fill: currentColor;
}

.collab__text {
  color: var(--color-text-muted);
}

@media (min-width: 720px) {
  .collab__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
