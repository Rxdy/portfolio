<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import EntityCard from '@/components/molecules/EntityCard.vue'

interface Company {
  name: string
  subtitle: string
  description: string
  link?: string
  linkLabel?: string
}

const companies: Company[] = [
  {
    name: 'Def Systèmes — Saint-Étienne',
    subtitle: 'Alternance · Développeur · depuis 2024',
    description:
      "Mon entreprise d'alternance pour la Licence puis le Master, après un stage d'un mois en juillet 2024. J'y développe sur des projets réels, dans un cadre professionnel.",
    link: 'https://def-systemes.fr',
    linkLabel: 'def-systemes.fr',
  },
  {
    name: 'CAVEM — Saint-Raphaël',
    subtitle: 'Stages · Service informatique · 2017 & 2018',
    description:
      "Communauté d'Agglomération Var Estérel Méditerranée. Deux stages au sein du service informatique pendant mon BTS SIO.",
  },
]
</script>

<template>
  <section id="companies" class="companies">
    <BaseHeading :level="2">Mes entreprises</BaseHeading>
    <div class="companies__grid">
      <EntityCard
        v-for="company in companies"
        :key="company.name"
        :name="company.name"
        :subtitle="company.subtitle"
        :description="company.description"
        :link="company.link"
        :link-label="company.linkLabel"
      />
    </div>
  </section>
</template>

<style scoped>
.companies {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.companies__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
}
</style>
