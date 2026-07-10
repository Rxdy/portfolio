<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import EntityCard from '@/components/molecules/EntityCard.vue'
import { techExperiences } from '@/data/experience'

const { t } = useI18n()

// « Mes entreprises » = expériences en contexte tech (source unique partagée avec le CV).
const companies = techExperiences.map((exp) => ({
  name: exp.org,
  subtitle: `${exp.role} · ${exp.period}`,
  description: exp.description,
  logo: exp.logo,
  link: exp.link,
  linkLabel: exp.linkLabel,
}))
</script>

<template>
  <section id="companies" class="companies">
    <BaseHeading :level="2">{{ t('companies.title') }}</BaseHeading>
    <div class="companies__grid">
      <EntityCard
        v-for="company in companies"
        :key="company.name"
        :name="company.name"
        :subtitle="company.subtitle"
        :description="company.description"
        :logo="company.logo"
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
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.companies__grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>
