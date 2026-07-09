<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import TimelineItem from '@/components/molecules/TimelineItem.vue'

interface Diploma {
  title: string
  place: string
  period: string
  /** Précision optionnelle (alternance, formation initiale...) */
  detail?: string
}

// Parcours scolaire — le plus récent en premier
const diplomas: Diploma[] = [
  {
    title: 'Master — Gestion de projet informatique',
    place: 'IRUP · Saint-Étienne',
    period: 'Sept. 2025 — Juil. 2027',
    detail: 'En cours · en alternance chez Def Systèmes',
  },
  {
    title: 'Licence — Informatique générale, spécialité développement',
    place: 'CNAM · Montbrison',
    period: 'Sept. 2024 — Juil. 2025',
    detail: 'En alternance chez Def Systèmes',
  },
  {
    title: 'BTS SIO option SLAM — Services Informatiques aux Organisations',
    place: 'Lycée Antoine de Saint-Exupéry · Saint-Raphaël',
    period: 'Sept. 2016 — Juin 2018',
    detail: 'Formation initiale · SLAM : Solutions Logicielles et Applications Métiers',
  },
  {
    title: 'Baccalauréat STI2D — spécialité SIN',
    place: 'Lycée François Mauriac · Andrézieux-Bouthéon',
    period: '2015 — 2016',
    detail:
      'Sciences et Technologies de l’Industrie et du Développement Durable · Systèmes d’Information et Numérique',
  },
]
</script>

<template>
  <section id="education" class="education">
    <BaseHeading :level="2">Parcours &amp; diplômes</BaseHeading>
    <ul class="education__timeline">
      <TimelineItem
        v-for="(diploma, index) in diplomas"
        :key="index"
        :title="diploma.title"
        :place="diploma.place"
        :period="diploma.period"
        :description="diploma.detail"
      />
    </ul>
    <RouterLink class="education__link" :to="{ name: 'education-detail' }">
      Voir mes écoles &amp; entreprises en détail →
    </RouterLink>
  </section>
</template>

<style scoped>
.education {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.education__timeline {
  list-style: none;
}

.education__link {
  color: var(--color-primary);
  font-weight: 600;
  width: fit-content;
}

.education__link:hover {
  color: var(--color-primary-hover);
}
</style>

