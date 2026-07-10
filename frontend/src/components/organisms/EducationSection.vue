<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import TimelineItem from '@/components/molecules/TimelineItem.vue'
import { diplomas } from '@/data/education'

const { t } = useI18n()
</script>

<template>
  <section id="education" class="education">
    <BaseHeading :level="2">{{ t('education.title') }}</BaseHeading>
    <ul class="education__timeline">
      <TimelineItem
        v-for="(diploma, index) in diplomas"
        :key="index"
        :title="diploma.title"
        :place="diploma.place"
        :period="diploma.period"
        :description="diploma.detail"
      />
    </ul>
    <RouterLink class="education__link" :to="{ name: 'education-detail' }">
      {{ t('education.link') }}
    </RouterLink>
  </section>
</template>

<style scoped>
.education {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.education__timeline {
  list-style: none;
}

.education__link {
  color: var(--color-primary);
  font-weight: 600;
  width: fit-content;
}

.education__link:hover {
  color: var(--color-primary-hover);
}
</style>

