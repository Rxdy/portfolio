<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, type RouteLocationRaw } from 'vue-router'
import { RiMenuLine, RiCloseLine } from '@remixicon/vue'
import NavLink from '@/components/atoms/NavLink.vue'
import ThemeToggle from '@/components/atoms/ThemeToggle.vue'

interface NavItem {
  label: string
  to: RouteLocationRaw
}

// Les ancres pointent vers l'accueil : fonctionnent aussi depuis une autre page
const links: NavItem[] = [
  { label: 'À propos', to: { path: '/', hash: '#about' } },
  { label: 'Expérience', to: { path: '/', hash: '#experience' } },
  { label: 'Parcours', to: { path: '/', hash: '#education' } },
  { label: 'Savoir-faire', to: { path: '/', hash: '#expertise' } },
  { label: 'Compétences', to: { name: 'skills' } },
  { label: 'Contact', to: { path: '/', hash: '#contact' } },
]

const isOpen = ref(false)
const route = useRoute()

// On referme le menu à chaque navigation
watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <header class="site-header" :class="{ 'is-open': isOpen }">
    <div class="site-header__inner">
      <RouterLink class="site-header__brand" :to="{ path: '/', hash: '#top' }">
        rxdy<span>.fr</span>
      </RouterLink>

      <nav class="site-header__nav" aria-label="Navigation principale">
        <NavLink v-for="link in links" :key="link.label" :to="link.to" @click="isOpen = false">
          {{ link.label }}
        </NavLink>
      </nav>

      <div class="site-header__controls">
        <ThemeToggle />
        <button
          class="site-header__burger"
          type="button"
          :aria-expanded="isOpen"
          aria-label="Ouvrir ou fermer le menu"
          @click="isOpen = !isOpen"
        >
          <component :is="isOpen ? RiCloseLine : RiMenuLine" class="site-header__burger-icon" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.site-header__brand {
  font-weight: 700;
  font-size: 1.15rem;
}

.site-header__brand span {
  color: var(--color-primary);
}

.site-header__controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.site-header__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background-color: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
}

.site-header__burger-icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}

/* --- Nav : repliée en panneau sur mobile (mobile-first) --- */
.site-header__nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: 0 var(--space-md);
  background-color: var(--color-bg);
  border-bottom: 1px solid transparent;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transition: max-height 0.28s ease, opacity 0.28s ease, padding 0.28s ease;
}

.site-header.is-open .site-header__nav {
  max-height: 24rem;
  opacity: 1;
  padding: var(--space-sm) var(--space-md) var(--space-md);
  border-bottom-color: var(--color-border);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.18);
  pointer-events: auto;
}

/* --- Desktop : nav inline, plus de burger --- */
@media (min-width: 768px) {
  .site-header__nav {
    position: static;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-md);
    margin-left: auto;
    padding: 0;
    max-height: none;
    opacity: 1;
    overflow: visible;
    pointer-events: auto;
    background: none;
    backdrop-filter: none;
    border-bottom: none;
    box-shadow: none;
  }

  .site-header__controls {
    margin-left: var(--space-lg);
  }

  .site-header__burger {
    display: none;
  }
}
</style>
