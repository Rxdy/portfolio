<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import TimelineItem from '@/components/molecules/TimelineItem.vue'
import { diplomas } from '@/data/education'

const { t } = useI18n()
</script>

<template>
  <section id="education" class="education full-bleed-section full-bleed-section--blue">
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
    <BaseButton class="education__link" variant="inverse" :to="{ name: 'education-detail' }">
      {{ t('education.link') }}
    </BaseButton>
  </section>
</template>

<style scoped>
.education {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.education__timeline {
  list-style: none;
}

.education__link {
  width: fit-content;
}
</style>

