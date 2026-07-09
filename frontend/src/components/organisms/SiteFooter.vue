<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RiGithubLine, RiMapPinLine } from '@remixicon/vue'

const year = new Date().getFullYear()

interface FooterLink {
  label: string
  to: RouteLocationRaw
}

const navLinks: FooterLink[] = [
  { label: 'À propos', to: { path: '/', hash: '#about' } },
  { label: 'Expérience', to: { path: '/', hash: '#experience' } },
  { label: 'Parcours', to: { path: '/', hash: '#education' } },
  { label: 'Écoles & entreprises', to: { name: 'education-detail' } },
  { label: 'Savoir-faire', to: { path: '/', hash: '#expertise' } },
  { label: 'Collaboration', to: { path: '/', hash: '#collaboration' } },
  { label: 'Compétences', to: { name: 'skills' } },
  { label: 'Mon parcours', to: { name: 'journey' } },
  { label: 'Contact', to: { path: '/', hash: '#contact' } },
]

const contacts = [
  { icon: RiGithubLine, label: 'github.com/rxdy', href: 'https://github.com/rxdy' },
  { icon: RiMapPinLine, label: 'Saint-Just Saint-Rambert (42)' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__col site-footer__brand-col">
        <RouterLink class="site-footer__brand" :to="{ path: '/', hash: '#top' }">
          rxdy<span>.fr</span>
        </RouterLink>
        <p class="site-footer__tagline">
          Développeur web passionné par la création de projets.
        </p>
      </div>

      <nav class="site-footer__col" aria-label="Navigation du pied de page">
        <h2 class="site-footer__title">Navigation</h2>
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          class="site-footer__link"
          :to="link.to"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="site-footer__col">
        <h2 class="site-footer__title">Contact</h2>
        <div v-for="item in contacts" :key="item.label" class="site-footer__contact">
          <component :is="item.icon" class="site-footer__icon" />
          <a v-if="item.href" :href="item.href" target="_blank" rel="noopener">{{
            item.label
          }}</a>
          <span v-else>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <p class="site-footer__copyright">
      © {{ year }} Rudy Alves — Construit avec Vue &amp; TypeScript.
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.site-footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md) var(--space-lg);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.site-footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.site-footer__brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text);
}

.site-footer__brand span {
  color: var(--color-primary);
}

.site-footer__tagline {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  max-width: 22rem;
}

.site-footer__title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  font-weight: 600;
}

.site-footer__link {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  transition: color 0.18s ease;
}

.site-footer__link:hover {
  color: var(--color-primary);
}

.site-footer__contact {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.site-footer__contact a:hover {
  color: var(--color-primary);
}

.site-footer__icon {
  width: 1.05rem;
  height: 1.05rem;
  color: var(--color-primary);
  fill: currentColor;
  flex-shrink: 0;
}

.site-footer__copyright {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  text-align: center;
}

@media (min-width: 700px) {
  .site-footer__inner {
    grid-template-columns: 1.4fr 1fr 1.2fr;
    gap: var(--space-xl);
  }
}
</style>
