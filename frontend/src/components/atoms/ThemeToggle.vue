<script setup lang="ts">
import { RiSunLine, RiMoonClearLine } from '@remixicon/vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'"
    @click="toggle"
  >
    <component :is="theme === 'dark' ? RiSunLine : RiMoonClearLine" class="theme-toggle__icon" />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background-color: var(--color-surface);
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.18s ease, transform 0.1s ease;
}

.theme-toggle:hover {
  border-color: var(--color-secondary);
}

.theme-toggle:active {
  transform: scale(0.92);
}

.theme-toggle__icon {
  width: 1.15rem;
  height: 1.15rem;
  color: var(--color-text);
  fill: currentColor;
}
</style>
