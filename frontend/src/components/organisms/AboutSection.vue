<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import SkillList from '@/components/molecules/SkillList.vue'

const { t } = useI18n()

// Les compétences les plus accrocheuses — le détail complet est sur /competences
const topSkills = ['Vue.js', 'TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'Docker']
</script>

<template>
  <section id="about" class="about full-bleed-section full-bleed-section--blue">
    <div class="about__intro">
      <BaseHeading :level="2">{{ t('about.title') }}</BaseHeading>
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
    </div>

    <div class="about__sidebar">
      <BaseHeading :level="3">{{ t('about.stackTitle') }}</BaseHeading>
      <SkillList :skills="topSkills" />
      <BaseButton class="about__link" variant="inverse" :to="{ name: 'skills' }">
        {{ t('about.skillsLink') }}
      </BaseButton>

      <BaseHeading :level="3">{{ t('about.languagesTitle') }}</BaseHeading>
      <p class="about__text">
        Français — langue maternelle. Anglais technique : à l'aise pour lire de la documentation et
        travailler au quotidien.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: var(--space-lg);
}

/* Deux colonnes sur desktop : le texte à gauche prenait toute la largeur en
   restant collé à gauche, avec un grand vide à droite sur un écran large. */
@media (min-width: 900px) {
  .about {
    grid-template-columns: 1.3fr 1fr;
    column-gap: var(--space-xl);
    align-items: start;
  }
}

.about__intro,
.about__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.about__text {
  max-width: 44rem;
  color: var(--color-text-muted);
}

.about__link {
  width: fit-content;
}
</style>
