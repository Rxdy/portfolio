<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { RiDownloadLine } from '@remixicon/vue'
import { profile, computeAge } from '@/data/profile'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { diplomas } from '@/data/education'
import { capabilities } from '@/data/capabilities'

// Le CV est volontairement toujours en français, quelle que soit la langue du
// site (choix de Rudy) — pas de useI18n() ici, contrairement au reste du site.
const age = computeAge()
const githubHandle = profile.github.replace(/^https?:\/\//, '')

// Le QR code renvoie vers le site (source à jour). Libellé affiché sous le QR.
const siteUrl = 'https://rxdy.fr'
const siteLabel = 'rxdy.fr'

// Le CV doit tenir sur une page : on ne met en avant que quelques projets (avec
// juste l'accroche, pas la description complète) plutôt que la liste entière.
// Le détail de tous les projets reste sur le site (voir QR code / rxdy.fr).
const cvProjects = projects.slice(0, 3)

function downloadPdf() {
  // Le CV se construit à partir des données du site ; l'export PDF passe par
  // « Imprimer → Enregistrer en PDF » du navigateur (styles @media print dédiés).
  window.print()
}
</script>

<template>
  <main class="cv">
    <!-- Barre d'actions : masquée à l'impression -->
    <div class="cv__toolbar">
      <button class="cv__download" type="button" @click="downloadPdf">
        <RiDownloadLine class="cv__download-icon" /> Télécharger en PDF
      </button>
    </div>

    <article class="cv__sheet">
      <header class="cv__header">
        <!-- Tout en haut, sur une ligne : nom — métier -->
        <div class="cv__heading">
          <h1 class="cv__name">{{ profile.name }}</h1>
          <span class="cv__title">— {{ profile.title }}</span>
        </div>

        <!-- En dessous, alignés sur une même rangée : photo, coordonnées en ligne, QR à droite -->
        <div class="cv__meta">
          <img class="cv__photo" :src="profile.photo" :alt="profile.name" />

          <ul class="cv__contact">
            <li>{{ profile.location }}</li>
            <li>{{ age }} ans</li>
            <li>{{ profile.drivingLicense }}</li>
            <li><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
            <li><a :href="profile.github" target="_blank" rel="noopener">{{ githubHandle }}</a></li>
          </ul>

          <div class="cv__qr">
            <QrcodeVue
              :value="siteUrl"
              :size="112"
              render-as="svg"
              level="M"
              background="#ffffff"
              foreground="#111111"
              class="cv__qr-img"
            />
            <a class="cv__qr-label" :href="siteUrl" target="_blank" rel="noopener">{{ siteLabel }}</a>
          </div>
        </div>
      </header>

      <p class="cv__summary">{{ profile.summary }}</p>

      <section class="cv__section">
        <h2 class="cv__section-title">Expérience professionnelle</h2>
        <div v-for="exp in experiences" :key="exp.org + exp.period" class="cv__entry">
          <div class="cv__entry-head">
            <span class="cv__entry-role">{{ exp.role }}</span>
            <span class="cv__entry-period">{{ exp.period }}</span>
          </div>
          <p class="cv__entry-org">{{ exp.org }}</p>
          <p class="cv__entry-desc">{{ exp.description }}</p>
        </div>
      </section>

      <section class="cv__section">
        <h2 class="cv__section-title">Projets</h2>
        <div v-for="project in cvProjects" :key="project.name" class="cv__entry">
          <div class="cv__entry-head">
            <span class="cv__entry-role">{{ project.name }}</span>
            <span class="cv__entry-period">{{ project.stack.join(' · ') }}</span>
          </div>
          <p class="cv__entry-org">{{ project.tagline }}</p>
        </div>
        <p class="cv__note">Tous mes projets sont détaillés sur le site.</p>
      </section>

      <section class="cv__section">
        <h2 class="cv__section-title">Formation</h2>
        <div v-for="d in diplomas" :key="d.title" class="cv__entry">
          <div class="cv__entry-head">
            <span class="cv__entry-role">{{ d.title }}</span>
            <span class="cv__entry-period">{{ d.period }}</span>
          </div>
          <p class="cv__entry-org">{{ d.place }}</p>
          <p v-if="d.detail" class="cv__entry-desc">{{ d.detail }}</p>
        </div>
      </section>

      <section class="cv__section">
        <h2 class="cv__section-title">Savoir-faire</h2>
        <div v-for="cap in capabilities" :key="cap.title" class="cv__savoir">
          <span class="cv__savoir-title">{{ cap.title }}</span>
          <span class="cv__savoir-items">{{ cap.summary }}</span>
        </div>
        <p class="cv__note">Détail complet des compétences (langages, outils, niveaux) sur le site.</p>
      </section>
    </article>
  </main>
</template>

<style scoped>
.cv {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md) var(--space-xl);
}

.cv__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.cv__download-icon {
  width: 1.1rem;
  height: 1.1rem;
  fill: currentColor;
}

.cv__download {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius);
  background-color: var(--color-primary);
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease;
}

.cv__download:hover {
  background-color: var(--color-primary-hover);
}

.cv__sheet {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.cv__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.cv__heading {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cv__name {
  font-size: 1.9rem;
  font-weight: 700;
}

.cv__title {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.2rem;
}

.cv__meta {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.cv__photo {
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.cv__contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  flex: 1;
  min-width: 0;
}

.cv__contact a:hover {
  color: var(--color-primary);
}

.cv__qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
  margin-left: auto;
}

.cv__qr-img {
  display: block;
  padding: 6px;
  background: #fff;
  border-radius: 8px;
}

.cv__qr-label {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
}

.cv__summary {
  color: var(--color-text-muted);
  max-width: 60ch;
}

.cv__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.cv__section-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  font-weight: 700;
}

.cv__entry-head {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.cv__entry-role {
  font-weight: 600;
}

.cv__entry-period {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

.cv__entry-org {
  color: var(--color-primary);
  font-size: 0.9rem;
}

.cv__entry-desc {
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.cv__entry + .cv__entry {
  margin-top: var(--space-sm);
}

.cv__savoir {
  font-size: 0.92rem;
}

.cv__savoir-title {
  font-weight: 600;
}

.cv__savoir-items {
  color: var(--color-text-muted);
}

.cv__note {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-style: italic;
}

/* Marges de page à 0 : supprime l'en-tête/pied de page par défaut du navigateur
   (titre, URL, numéro de page, date) — Chrome ne les affiche pas quand la page
   n'a pas de marge. On recrée l'espace via le padding de .cv__sheet ci-dessous. */
@page {
  margin: 0;
}

/* --- Impression / export PDF : feuille blanche épurée, sans chrome --- */
@media print {
  .cv {
    max-width: none;
    padding: 0;
  }

  .cv__toolbar {
    display: none;
  }

  .cv__sheet {
    border: none;
    border-radius: 0;
    padding: 12mm 14mm;
    background: #fff;
    color: #000;
    gap: 0.4rem;
    font-size: 0.82rem;
    line-height: 1.35;
  }

  /* Rythme vertical resserré à l'impression (le confort d'une page web n'est pas
     nécessaire sur un CV imprimé — l'objectif est de tenir sur une seule page). */
  .cv__header {
    gap: 0.35rem;
  }

  .cv__photo {
    width: 3.75rem;
    height: 3.75rem;
  }

  .cv__qr-img {
    width: 80px !important;
    height: 80px !important;
  }

  .cv__summary {
    max-width: none;
  }

  .cv__section {
    gap: 0.15rem;
    padding-top: 0.25rem;
  }

  .cv__entry + .cv__entry {
    margin-top: 0.1rem;
  }

  .cv__entry-desc {
    font-size: 0.85em;
  }

  /* On évite de couper une entrée (ou le titre d'une section) en plein milieu, mais
     la section elle-même peut se répartir sur deux pages — sinon un gros bloc qui ne
     tient pas dans l'espace restant bascule entièrement à la page suivante et laisse
     un grand vide derrière lui. */
  .cv__section-title {
    break-after: avoid;
  }

  .cv__entry,
  .cv__savoir {
    break-inside: avoid;
  }

  /* Le QR doit garder son fond blanc à l'impression pour rester scannable */
  .cv__qr-img {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
