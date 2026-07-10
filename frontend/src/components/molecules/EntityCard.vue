<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'

const { t } = useI18n()

const props = defineProps<{
  /** Nom de l'école ou de l'entreprise */
  name: string
  /** Ligne secondaire : ville, période, rôle... */
  subtitle: string
  /** Descriptif */
  description: string
  /** Chemin d'un logo (ex: /logos/def-systemes.svg). Sinon un monogramme est généré. */
  logo?: string
  /** Lien externe optionnel (site de l'entreprise) */
  link?: string
  /** Libellé du lien */
  linkLabel?: string
}>()

// Initiales à partir du nom (jusqu'à 2 lettres), pour le monogramme de repli
const initials = computed(() =>
  props.name
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)
</script>

<template>
  <article class="entity-card">
    <span class="entity-card__logo">
      <img v-if="logo" :src="logo" :alt="`Logo ${name}`" />
      <span v-else class="entity-card__monogram" aria-hidden="true">{{ initials }}</span>
    </span>
    <div class="entity-card__body">
      <BaseHeading :level="3">{{ name }}</BaseHeading>
      <p class="entity-card__subtitle">{{ subtitle }}</p>
      <p class="entity-card__description">{{ description }}</p>
      <a v-if="link" class="entity-card__link" :href="link" target="_blank" rel="noopener">
        {{ linkLabel ?? t('entityCard.defaultLink') }} →
      </a>
    </div>
  </article>
</template>

<style scoped>
.entity-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.entity-card:hover {
  border-color: var(--color-secondary);
  transform: translateY(-4px);
}

.entity-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 0;
  flex: 1;
}

.entity-card__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
}

.entity-card__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}

.entity-card__monogram {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.entity-card__subtitle {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.entity-card__description {
  color: var(--color-text-muted);
  flex-grow: 1;
}

.entity-card__link {
  color: var(--color-primary);
  font-weight: 600;
  margin-top: var(--space-xs);
}

.entity-card__link:hover {
  color: var(--color-primary-hover);
}
</style>
