<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiRocketLine, RiGithubLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import { projectsOrg } from '@/data/projects'

const { t } = useI18n()
const orgHandle = projectsOrg.url.replace(/^https?:\/\//, '')

// Hugo Lagouardat — le binôme cité dans la carte « Un binôme de confiance ».
const partner = {
  name: 'Hugo Lagouardat',
  github: 'https://github.com/hugolagouardat',
  photo: '/people/hugo.png',
}
const partnerHandle = partner.github.replace(/^https?:\/\//, '')
</script>

<template>
  <main class="collab page">
    <header class="collab__header">
      <BaseHeading :level="1">{{ t('collaboration.title') }}</BaseHeading>
      <p class="collab__lead">{{ t('collaboration.lead') }}</p>
    </header>

    <div class="collab__grid">
      <article class="collab__card">
        <span class="collab__icon collab__icon--logo">
          <img src="/logos/abend-core.png" alt="" />
        </span>
        <div class="collab__card-body">
          <BaseHeading :level="2">{{ t('collaboration.orgTitle', { org: projectsOrg.name }) }}</BaseHeading>
          <p class="collab__text">
            Les projets que je mène avec mon collègue sont regroupés sur notre organisation
            GitHub commune — c'est là que notre travail à deux est le plus visible.
          </p>
          <a class="collab__org-link" :href="projectsOrg.url" target="_blank" rel="noopener">
            <RiGithubLine class="collab__org-link-icon" /> {{ orgHandle }} →
          </a>
        </div>
      </article>

      <article class="collab__card">
        <span class="collab__icon collab__icon--logo">
          <img :src="partner.photo" alt="" />
        </span>
        <div class="collab__card-body">
          <BaseHeading :level="2">{{ t('collaboration.duoTitle') }}</BaseHeading>
          <p class="collab__text">
            Je travaille étroitement avec un ancien étudiant rencontré durant mon parcours. Nous
            partageons la même vision et la même exigence, et nous avançons ensemble sur des
            projets communs — chacun apportant sa complémentarité.
          </p>
          <a class="collab__org-link" :href="partner.github" target="_blank" rel="noopener">
            <RiGithubLine class="collab__org-link-icon" /> {{ partnerHandle }} →
          </a>
        </div>
      </article>

      <article class="collab__card">
        <span class="collab__icon"><RiRocketLine /></span>
        <div class="collab__card-body">
          <BaseHeading :level="2">{{ t('collaboration.companyTitle') }}</BaseHeading>
          <p class="collab__text">
            Ensemble, nous envisageons de créer une entreprise pour répondre aux besoins des
            professionnels comme des particuliers : améliorer leurs solutions existantes ou en
            concevoir de nouvelles, adaptées à leurs usages.
          </p>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.collab {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.collab__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.collab__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.collab__grid {
  display: flex;
  flex-direction: column;
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

.collab__card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.collab__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  color: #fff;
}

.collab__icon :deep(svg) {
  width: 1.4rem;
  height: 1.4rem;
  fill: currentColor;
}

.collab__icon--logo {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.collab__icon--logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collab__text {
  color: var(--color-text-muted);
}

.collab__org-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  font-weight: 600;
  width: fit-content;
}

.collab__org-link:hover {
  color: var(--color-primary-hover);
}

.collab__org-link-icon {
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
}

/* --- Au-delà du mobile : carte horizontale (icône à gauche, contenu à droite) --- */
@media (min-width: 640px) {
  .collab__card {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-lg);
  }
}
</style>
