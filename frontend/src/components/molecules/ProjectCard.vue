<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiGithubLine, RiExternalLinkLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import type { Project } from '@/data/projects'

defineProps<{ project: Project }>()
const { t } = useI18n()
</script>

<template>
  <article class="project-card">
    <div class="project-card__head">
      <BaseHeading :level="3">{{ project.name }}</BaseHeading>
      <span v-if="project.role" class="project-card__role">{{ project.role }}</span>
    </div>

    <p class="project-card__tagline">{{ project.tagline }}</p>
    <p class="project-card__description">{{ project.description }}</p>

    <ul class="project-card__stack">
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>

    <div v-if="project.repo || project.demo" class="project-card__links">
      <a
        v-if="project.repo"
        class="project-card__link"
        :href="project.repo"
        target="_blank"
        rel="noopener"
      >
        <RiGithubLine class="project-card__link-icon" /> {{ t('projectCard.repo') }}
      </a>
      <a
        v-if="project.demo"
        class="project-card__link"
        :href="project.demo"
        target="_blank"
        rel="noopener"
      >
        <RiExternalLinkLine class="project-card__link-icon" /> {{ t('projectCard.demo') }}
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.project-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

.project-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.project-card__role {
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.project-card__tagline {
  color: var(--color-text);
  font-weight: 600;
}

.project-card__description {
  color: var(--color-text-muted);
}

.project-card__stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.project-card__stack li {
  padding: 0.25rem 0.6rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-xs);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  font-weight: 600;
}

.project-card__link:hover {
  color: var(--color-primary-hover);
}

.project-card__link-icon {
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
}
</style>
