<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import { capabilities } from '@/data/capabilities'

const { t } = useI18n()
</script>

<template>
  <section id="expertise" class="expertise">
    <BaseHeading :level="2">{{ t('expertise.title') }}</BaseHeading>
    <p class="expertise__intro">
      Au-delà du code, j'interviens sur l'ensemble du cycle d'un projet — de la planification à la
      mise en production — avec une exigence de qualité et des architectures pensées pour durer.
    </p>
    <div class="expertise__grid">
      <article v-for="cap in capabilities" :key="cap.title" class="capability-brief">
        <span class="capability-brief__icon">
          <component :is="cap.icon" />
        </span>
        <div>
          <BaseHeading :level="3">{{ cap.title }}</BaseHeading>
          <p class="capability-brief__summary">{{ cap.summary }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.expertise {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.expertise__intro {
  max-width: 44rem;
  color: var(--color-text-muted);
}

.expertise__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.capability-brief {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.capability-brief__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  color: #fff;
}

.capability-brief__icon :deep(svg) {
  width: 1.3rem;
  height: 1.3rem;
  fill: currentColor;
}

.capability-brief__summary {
  margin-top: 0.2rem;
  color: var(--color-text-muted);
}

@media (min-width: 640px) {
  .expertise__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
