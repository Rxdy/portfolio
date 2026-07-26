<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiMapPinLine, RiCarLine, RiCake2Line } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { profile, computeAge } from '@/data/profile'

const { t } = useI18n()

// Infos personnelles affichées sous l'accroche (issues de la source unique `profile`).
const infos = [
  { icon: RiMapPinLine, label: profile.location },
  { icon: RiCake2Line, label: `${computeAge()} ans` },
  { icon: RiCarLine, label: profile.drivingLicense },
]
</script>

<template>
  <section id="top" class="hero full-bleed-section">
    <div class="hero__intro">
      <img class="hero__photo" :src="profile.photo" :alt="profile.name" />
      <div class="hero__intro-text">
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
        <BaseHeading :level="1">{{ profile.name }}</BaseHeading>
      </div>
    </div>
    <p class="hero__subtitle">{{ profile.summary }}</p>
    <ul class="hero__infos">
      <li v-for="item in infos" :key="item.label" class="hero__info">
        <component :is="item.icon" class="hero__info-icon" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
    <div class="hero__actions">
      <BaseButton variant="secondary" :to="{ name: 'contact' }">
        {{ t('hero.ctaContact') }}
      </BaseButton>
      <BaseButton variant="ghost" :to="{ name: 'cv' }">{{ t('hero.ctaCv') }}</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
}

.hero__intro {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.hero__intro-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.hero__photo {
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.hero__eyebrow {
  color: var(--color-primary);
  font-weight: 600;
}

.hero__subtitle {
  max-width: 40rem;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.hero__infos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-lg);
}

.hero__info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.hero__info-icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--color-primary);
  fill: currentColor;
  flex-shrink: 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-sm);
}
</style>
