<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiGithubLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import ProjectCard from '@/components/molecules/ProjectCard.vue'
import { projects, projectsOrg } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <main class="projects page">
    <header class="projects__header">
      <BaseHeading :level="1">{{ t('projects.title') }}</BaseHeading>
      <p class="projects__lead">{{ t('projects.lead') }}</p>
    </header>

    <div class="projects__grid">
      <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
    </div>

    <p class="projects__org">
      D'autres projets communs avec mon collègue sont regroupés sur l'organisation
      <a :href="projectsOrg.url" target="_blank" rel="noopener">
        <RiGithubLine class="projects__org-icon" />{{ projectsOrg.name }}
      </a>.
    </p>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.projects {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.projects__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.projects__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.projects__org {
  color: var(--color-text-muted);
}

.projects__org a {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-primary);
  font-weight: 600;
}

.projects__org-icon {
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
}
</style>
