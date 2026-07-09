<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import TimelineItem from '@/components/molecules/TimelineItem.vue'

interface Experience {
  title: string
  place: string
  period: string
  description?: string
}

// Expériences professionnelles — la plus récente en premier
const experiences: Experience[] = [
  {
    title: 'Développeur en alternance',
    place: 'Def Systèmes · Saint-Étienne (def-systemes.fr)',
    period: 'Depuis sept. 2024',
    description:
      "Précédé d'un stage d'un mois en juillet 2024. En alternance pendant la Licence puis le Master : je développe en conditions réelles, sur des projets d'entreprise, tout en consolidant mes compétences.",
  },
  {
    title: 'Stagiaire — Service informatique',
    place: 'CAVEM · Saint-Raphaël',
    period: '2017 & 2018',
    description:
      "Deux stages au service informatique de la Communauté d'Agglomération Var Estérel Méditerranée : du 22/05 au 30/06/2017, puis du 22/01 au 02/03/2018.",
  },
]
</script>

<template>
  <section id="experience" class="experience">
    <BaseHeading :level="2">Expérience</BaseHeading>
    <ul class="experience__timeline">
      <TimelineItem
        v-for="(experience, index) in experiences"
        :key="index"
        :title="experience.title"
        :place="experience.place"
        :period="experience.period"
        :description="experience.description"
      />
    </ul>
  </section>
</template>

<style scoped>
.experience {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.experience__timeline {
  list-style: none;
}
</style>
