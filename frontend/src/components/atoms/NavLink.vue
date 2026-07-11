<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  /** Destination (route ou route + ancre) */
  to: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink class="nav-link" :to="to">
    <slot />
  </RouterLink>
</template>

<style scoped>
.nav-link {
  position: relative;
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color 0.18s ease;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.18s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Page active : exact-active seulement, sinon "Accueil" (route "/") reste
   marqué actif partout puisque toutes les routes commencent par "/". */
.nav-link.router-link-exact-active {
  color: var(--color-text);
  font-weight: 700;
}

.nav-link.router-link-exact-active::after {
  width: 100%;
}
</style>
