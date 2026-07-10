<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiTranslate2 } from '@remixicon/vue'
import { useLocale } from '@/composables/useLocale'

const { locale, toggle } = useLocale()
const { t } = useI18n()
</script>

<template>
  <button class="locale-toggle" type="button" :aria-label="t('locale.toggle')" @click="toggle">
    <RiTranslate2 class="locale-toggle__icon" />
    <span class="locale-toggle__code">{{ locale.toUpperCase() }}</span>
  </button>
</template>

<style scoped>
.locale-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  height: 2.25rem;
  padding: 0 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background-color: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.18s ease, transform 0.1s ease;
}

.locale-toggle:hover {
  border-color: var(--color-secondary);
}

.locale-toggle:active {
  transform: scale(0.95);
}

.locale-toggle__icon {
  width: 1.05rem;
  height: 1.05rem;
  color: var(--color-text);
  fill: currentColor;
}
</style>
