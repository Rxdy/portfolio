<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RiMapPinLine, RiArrowUpLine } from '@remixicon/vue'

const { t } = useI18n()
const year = new Date().getFullYear()

const contacts = [
  { icon: RiMapPinLine, label: 'Saint-Just Saint-Rambert (42)' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__col site-footer__brand-col">
        <RouterLink class="site-footer__brand" :to="{ name: 'home' }">
          rxdy<span>.fr</span>
        </RouterLink>
        <p class="site-footer__tagline">
          Développeur web passionné par la création de projets.
        </p>
      </div>

      <div class="site-footer__col">
        <h2 class="site-footer__title">{{ t('footer.contactTitle') }}</h2>
        <div v-for="item in contacts" :key="item.label" class="site-footer__contact">
          <component :is="item.icon" class="site-footer__icon" />
          <span>{{ item.label }}</span>
        </div>
        <RouterLink class="site-footer__link" :to="{ name: 'contact' }">
          {{ t('footer.contactLink') }}
        </RouterLink>
        <RouterLink class="site-footer__link" :to="{ name: 'cv' }">
          {{ t('footer.cvLink') }}
        </RouterLink>
      </div>

      <div class="site-footer__col">
        <h2 class="site-footer__title">{{ t('footer.legalTitle') }}</h2>
        <RouterLink class="site-footer__link" :to="{ name: 'legal' }">
          {{ t('footer.legalLink') }}
        </RouterLink>
      </div>

      <div class="site-footer__col">
        <h2 class="site-footer__title">{{ t('footer.stackTitle') }}</h2>
        <p class="site-footer__stack">Vue 3 · TypeScript · Vite · Docker</p>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p class="site-footer__copyright">© {{ year }} Rudy Alves</p>
      <button class="site-footer__top" type="button" @click="scrollToTop">
        <RiArrowUpLine class="site-footer__top-icon" /> {{ t('footer.top') }}
      </button>
    </div>
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

.site-footer__contact {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.site-footer__link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
  width: fit-content;
}

.site-footer__link:hover {
  color: var(--color-primary-hover);
}

.site-footer__stack {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.site-footer__icon {
  width: 1.05rem;
  height: 1.05rem;
  color: var(--color-primary);
  fill: currentColor;
  flex-shrink: 0;
}

.site-footer__bottom {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.site-footer__copyright {
  text-align: center;
}

.site-footer__top {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  transition: color 0.18s ease;
}

.site-footer__top:hover {
  color: var(--color-primary);
}

.site-footer__top-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

@media (min-width: 640px) {
  .site-footer__inner {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .site-footer__inner {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }

  .site-footer__bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
