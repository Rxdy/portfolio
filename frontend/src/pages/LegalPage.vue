<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <main class="legal page">
    <header class="legal__header">
      <BaseHeading :level="1">Mentions légales &amp; confidentialité</BaseHeading>
      <p class="legal__lead">
        Ce site est un portfolio personnel, sans activité commerciale. Voici, en toute
        transparence, qui le publie et ce qu'il fait (ou ne fait pas) de vos données.
      </p>
    </header>

    <section class="legal__section">
      <BaseHeading :level="2">Éditeur du site</BaseHeading>
      <p class="legal__text">
        {{ profile.name }}, développeur web — {{ profile.location }}. Site édité et publié à
        titre personnel. Contact : via le
        <RouterLink :to="{ name: 'contact' }">formulaire de contact</RouterLink>.
      </p>
    </section>

    <section class="legal__section">
      <BaseHeading :level="2">Hébergement</BaseHeading>
      <p class="legal__text">
        Le site est en cours de développement. Les informations d'hébergement seront précisées
        ici dès sa mise en production.
      </p>
    </section>

    <section class="legal__section">
      <BaseHeading :level="2">Propriété intellectuelle</BaseHeading>
      <p class="legal__text">
        Les contenus de ce site (textes, mise en page, code) sont une création originale. Toute
        reproduction sans autorisation est interdite, hors citation courte avec mention de la
        source.
      </p>
    </section>

    <section class="legal__section">
      <BaseHeading :level="2">Données personnelles</BaseHeading>
      <p class="legal__text">
        Le seul point de collecte de données est le
        <RouterLink :to="{ name: 'contact' }">formulaire de contact</RouterLink>
        (nom, email, message). Ces informations servent uniquement à répondre à votre demande,
        ne sont transmises à aucun tiers et ne sont conservées que le temps nécessaire à
        l'échange.
      </p>
      <p class="legal__text">
        Vous pouvez demander l'accès, la rectification ou la suppression de ces données à tout
        moment, via le formulaire de contact.
      </p>
    </section>

    <section class="legal__section">
      <BaseHeading :level="2">Cookies &amp; stockage local</BaseHeading>
      <p class="legal__text">
        Ce site n'utilise aucun cookie de suivi ni outil d'analyse d'audience. Seule votre
        préférence d'affichage (thème clair/sombre) est enregistrée localement dans votre
        navigateur (localStorage) — cette information reste sur votre appareil et n'est jamais
        transmise.
      </p>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.legal {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.legal__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.legal__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.legal__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.legal__text {
  color: var(--color-text-muted);
  max-width: 60ch;
}

.legal__text :deep(a) {
  color: var(--color-primary);
  font-weight: 600;
}

.legal__text :deep(a):hover {
  color: var(--color-primary-hover);
}
</style>
