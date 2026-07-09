<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import EntityCard from '@/components/molecules/EntityCard.vue'

interface School {
  name: string
  subtitle: string
  description: string
}

const schools: School[] = [
  {
    name: 'IRUP — Saint-Étienne',
    subtitle: 'Master · Gestion de projet informatique · 2025 — 2027',
    description:
      "Formation en alternance axée sur le pilotage de projets informatiques : gestion d'équipe, méthodes, coordination technique et fonctionnelle.",
  },
  {
    name: 'CNAM — Montbrison',
    subtitle: 'Licence · Informatique générale, spécialité développement · 2024 — 2025',
    description:
      "Licence obtenue en alternance, centrée sur le développement logiciel et les fondamentaux de l'informatique.",
  },
  {
    name: 'Lycée Antoine de Saint-Exupéry — Saint-Raphaël',
    subtitle: 'BTS SIO option SLAM · 2016 — 2018',
    description:
      'Services Informatiques aux Organisations, option SLAM (Solutions Logicielles et Applications Métiers) : développement d’applications et gestion de solutions logicielles.',
  },
  {
    name: 'Lycée François Mauriac — Andrézieux-Bouthéon',
    subtitle: 'Baccalauréat STI2D spécialité SIN · 2015 — 2016',
    description:
      'Sciences et Technologies de l’Industrie et du Développement Durable, spécialité Systèmes d’Information et Numérique : première approche du numérique et des systèmes.',
  },
]
</script>

<template>
  <section id="schools" class="schools">
    <BaseHeading :level="2">Mes écoles</BaseHeading>
    <div class="schools__grid">
      <EntityCard
        v-for="school in schools"
        :key="school.name"
        :name="school.name"
        :subtitle="school.subtitle"
        :description="school.description"
      />
    </div>
  </section>
</template>

<style scoped>
.schools {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.schools__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
}
</style>
