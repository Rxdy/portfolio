<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import SkillBar from '@/components/molecules/SkillBar.vue'
import { skillGroups as groups } from '@/data/skills'
import { projectsUsingSkill } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <main class="skills page">
    <header class="skills__header">
      <BaseHeading :level="1">{{ t('skills.title') }}</BaseHeading>
      <p class="skills__lead">{{ t('skills.lead') }}</p>
    </header>

    <section v-for="group in groups" :key="group.title" class="skills__group">
      <BaseHeading :level="2">{{ group.title }}</BaseHeading>
      <div class="skills__grid">
        <SkillBar
          v-for="skill in group.skills"
          :key="skill.label"
          :label="skill.label"
          :level="skill.level"
          :projects="projectsUsingSkill(skill.label).map((p) => p.name)"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.skills {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.skills__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.skills__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.skills__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md) var(--space-lg);
}

@media (min-width: 640px) {
  .skills__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
