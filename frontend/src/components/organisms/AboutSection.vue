<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import SkillList from '@/components/molecules/SkillList.vue'

// Les compétences les plus accrocheuses — le détail complet est sur /competences
const topSkills = ['Vue.js', 'TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'Docker']
</script>

<template>
  <section id="about" class="about">
    <BaseHeading :level="2">À propos</BaseHeading>
    <p class="about__text">
      Ce qui me fait vibrer, c'est de créer. Depuis des années, je lance des projets pour le plaisir
      d'apprendre et de construire : je pars d'une idée, je la prototype, et je l'améliore jusqu'à ce
      qu'elle tourne vraiment. J'aime autant soigner l'interface côté front que structurer une API
      propre côté back.
    </p>
    <p class="about__text">
      Au fil du temps, je me suis surtout demandé comment aller plus loin : comment des applications
      plus grandes fonctionnent, comment mieux structurer mon code. Je me suis challengé, et j'ai
      appris puis consolidé mes compétences au rythme de mes formations — en continu jusqu'au BTS,
      puis en alternance pour la Licence et le Master.
    </p>

    <BaseHeading :level="3">Mes technos de prédilection</BaseHeading>
    <SkillList :skills="topSkills" />
    <RouterLink class="about__link" :to="{ name: 'skills' }">
      Voir toutes mes compétences en détail →
    </RouterLink>

    <BaseHeading :level="3">Langues</BaseHeading>
    <p class="about__text">
      Français — langue maternelle. Anglais technique : à l'aise pour lire de la documentation et
      travailler au quotidien.
    </p>
  </section>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.about__text {
  max-width: 44rem;
  color: var(--color-text-muted);
}

.about__link {
  color: var(--color-primary);
  font-weight: 600;
  width: fit-content;
}

.about__link:hover {
  color: var(--color-primary-hover);
}
</style>
