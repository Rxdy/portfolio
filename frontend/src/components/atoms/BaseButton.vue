<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    /** Style visuel du bouton */
    variant?: 'primary' | 'secondary' | 'ghost'
    /** Rend un <a> si href est fourni, sinon un <button> */
    href?: string
    /** Rend un <RouterLink> pour une navigation interne (prioritaire sur href) */
    to?: RouteLocationRaw
  }>(),
  { variant: 'primary' },
)
</script>

<template>
  <RouterLink v-if="to" :to="to" class="base-button" :class="`base-button--${variant}`">
    <slot />
  </RouterLink>
  <component
    :is="href ? 'a' : 'button'"
    v-else
    :href="href"
    class="base-button"
    :class="`base-button--${variant}`"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid transparent;
  border-radius: var(--radius);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.05s ease;
}

.base-button:active {
  transform: translateY(1px);
}

.base-button--primary {
  background-color: var(--color-primary);
  color: #fff;
}

.base-button--primary:hover {
  background-color: var(--color-primary-hover);
}

.base-button--secondary {
  background-color: var(--color-secondary);
  color: #fff;
}

.base-button--secondary:hover {
  background-color: var(--color-secondary-hover);
}

.base-button--ghost {
  background-color: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}

.base-button--ghost:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
