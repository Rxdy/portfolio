<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import EntityCard from '@/components/molecules/EntityCard.vue'

const { t } = useI18n()

interface School {
  name: string
  subtitle: string
  description: string
  logo?: string
}

const schools: School[] = [
  {
    name: 'IRUP — Saint-Étienne',
    subtitle: 'Master · Gestion de projet informatique · 2025 — 2027',
    description:
      "Formation en alternance axée sur le pilotage de projets informatiques : gestion d'équipe, méthodes, coordination technique et fonctionnelle.",
    logo: '/logos/irup.svg',
  },
  {
    name: 'CNAM — Montbrison',
    subtitle: 'Licence · Informatique générale, spécialité développement · 2024 — 2025',
    description:
      "Licence obtenue en alternance, centrée sur le développement logiciel et les fondamentaux de l'informatique.",
    logo: '/logos/cnam.svg',
  },
  {
    name: 'Lycée Antoine de Saint-Exupéry — Saint-Raphaël',
    subtitle: 'BTS SIO option SLAM · 2016 — 2018',
    description:
      'Services Informatiques aux Organisations, option SLAM (Solutions Logicielles et Applications Métiers) : développement d’applications et gestion de solutions logicielles.',
    logo: '/logos/saint-exupery.jpg',
  },
  {
    name: 'Lycée François Mauriac — Andrézieux-Bouthéon',
    subtitle: 'Baccalauréat STI2D spécialité SIN · 2015 — 2016',
    description:
      'Sciences et Technologies de l’Industrie et du Développement Durable, spécialité Systèmes d’Information et Numérique : première approche du numérique et des systèmes.',
    logo: '/logos/aura.jpg',
  },
]
</script>

<template>
  <section id="schools" class="schools">
    <BaseHeading :level="2">{{ t('schools.title') }}</BaseHeading>
    <div class="schools__grid">
      <EntityCard
        v-for="school in schools"
        :key="school.name"
        :name="school.name"
        :subtitle="school.subtitle"
        :description="school.description"
        :logo="school.logo"
      />
    </div>
  </section>
</template>

<style scoped>
.schools {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.schools__grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>
