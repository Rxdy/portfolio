<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'

const { t } = useI18n()
</script>

<template>
  <RouterLink class="journey-teaser full-bleed-section" :to="{ name: 'journey' }">
    <div class="journey-teaser__content">
      <BaseHeading :level="3">Un parcours un peu atypique</BaseHeading>
      <p class="journey-teaser__text">
        Entre mes diplômes, il y a eu la vie active et la création d'une famille. Une étape que
        j'assume et qui m'a aussi beaucoup appris.
      </p>
      <span class="journey-teaser__more">{{ t('common.readMore') }}</span>
    </div>

    <!-- Les vraies étapes du parcours (voir /mon-parcours), en mini-frise
         zigzag plutôt qu'en points décoratifs sans signification. Desktop
         seulement (voir CSS) : sur mobile la largeur manque pour les
         étiquettes. -->
    <svg class="journey-teaser__path" viewBox="0 0 500 170" aria-hidden="true">
      <path
        class="journey-teaser__path-line"
        d="M20 130 C68 130 68 50 116 50 C164 50 164 120 212 120
           C260 120 260 45 308 45 C356 45 356 125 404 125
           C437 125 437 70 470 70"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="2 12"
      />
      <!-- Le vrai tournant "atypique" : la vie de famille, tout au début du chemin. -->
      <circle class="journey-teaser__path-dot journey-teaser__path-dot--start" cx="20" cy="130" r="5" />
      <!-- McDonald's, avec sa propre progression (2 points, même couleur). -->
      <circle class="journey-teaser__path-dot" cx="116" cy="50" r="4" />
      <circle class="journey-teaser__path-dot" cx="212" cy="120" r="4" />
      <circle class="journey-teaser__path-dot" cx="308" cy="45" r="4" />
      <circle class="journey-teaser__path-dot" cx="404" cy="125" r="4" />
      <circle class="journey-teaser__path-dot journey-teaser__path-dot--end" cx="470" cy="70" r="6" />

      <text class="journey-teaser__path-label" x="20" y="150" text-anchor="start">Vie de famille</text>
      <text class="journey-teaser__path-label" x="116" y="32" text-anchor="middle">McDonald's</text>
      <text class="journey-teaser__path-label" x="212" y="140" text-anchor="middle">Évolution</text>
      <text class="journey-teaser__path-label" x="308" y="27" text-anchor="middle">Reprise des études</text>
      <text class="journey-teaser__path-label" x="404" y="145" text-anchor="middle">Master</text>
      <text class="journey-teaser__path-label journey-teaser__path-label--end" x="470" y="52" text-anchor="end">
        Aujourd'hui
      </text>
    </svg>
  </RouterLink>
</template>

<style scoped>
.journey-teaser {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  border-left: 4px solid var(--color-secondary);
}

.journey-teaser__text {
  margin-top: var(--space-xs);
  color: var(--color-text-muted);
  max-width: 44rem;
}

.journey-teaser__more {
  display: inline-block;
  margin-top: var(--space-sm);
  color: var(--color-primary);
  font-weight: 600;
}

.journey-teaser__path {
  display: none;
  flex-shrink: 0;
  width: 32rem;
  height: 10.9rem;
}

.journey-teaser__path-line {
  stroke: var(--color-border);
}

.journey-teaser__path-dot {
  fill: var(--color-secondary);
}

.journey-teaser__path-dot--end {
  fill: var(--color-primary);
}

.journey-teaser__path-label {
  fill: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
}

.journey-teaser__path-label--end {
  fill: var(--color-primary);
}

@media (min-width: 1100px) {
  .journey-teaser__path {
    display: block;
  }
}
</style>
