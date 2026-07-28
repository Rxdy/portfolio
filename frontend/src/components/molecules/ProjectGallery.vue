<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/vue'

const props = defineProps<{
  /** Chemins des captures d'écran (dans /public) */
  images: string[]
  /** Nom du projet, pour les textes alternatifs */
  name: string
  /** Grisées (projet hors ligne) — voir ProjectCard */
  grayscale?: boolean
}>()

const openIndex = ref<number | null>(null)

function open(index: number): void {
  openIndex.value = index
}

function close(): void {
  openIndex.value = null
}

// Pas de garde ici : next()/prev() ne sont appelées que par les flèches de
// nav (rendues uniquement modale ouverte) ou par onKeydown, qui a déjà
// vérifié openIndex avant d'appeler l'une ou l'autre.
function next(): void {
  openIndex.value = (openIndex.value! + 1) % props.images.length
}

function prev(): void {
  openIndex.value = (openIndex.value! - 1 + props.images.length) % props.images.length
}

function onKeydown(event: KeyboardEvent): void {
  // Garde nécessaire malgré l'écouteur retiré à la fermeture (voir watch
  // ci-dessous) : sa suppression passe par le cycle réactif de Vue, pas
  // forcément synchrone avec un keydown répété très rapidement (touche
  // maintenue) juste avant/pendant la fermeture.
  /* c8 ignore next */
  if (openIndex.value === null) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}

// Écouteur clavier actif seulement pendant que la modale est ouverte, pour
// ne jamais intercepter Échap/flèches ailleurs sur la page.
watch(openIndex, (value) => {
  if (value !== null) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="images.length" class="project-gallery">
    <button
      v-for="(src, index) in images"
      :key="src"
      type="button"
      class="project-gallery__thumb"
      :class="{ 'project-gallery__thumb--grayscale': grayscale }"
      @click="open(index)"
    >
      <img :src="src" :alt="`Capture d'écran de ${name} (${index + 1}/${images.length})`" loading="lazy" />
    </button>

    <Teleport to="body">
      <div
        v-if="openIndex !== null"
        class="project-gallery__modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`Capture d'écran de ${name}`"
        @click.self="close"
      >
        <button type="button" class="project-gallery__close" aria-label="Fermer" @click="close">
          <RiCloseLine />
        </button>
        <button
          v-if="images.length > 1"
          type="button"
          class="project-gallery__nav project-gallery__nav--prev"
          aria-label="Image précédente"
          @click="prev"
        >
          <RiArrowLeftSLine />
        </button>
        <img
          class="project-gallery__modal-image"
          :class="{ 'project-gallery__thumb--grayscale': grayscale }"
          :src="images[openIndex]"
          :alt="`Capture d'écran de ${name} (${openIndex + 1}/${images.length})`"
        />
        <button
          v-if="images.length > 1"
          type="button"
          class="project-gallery__nav project-gallery__nav--next"
          aria-label="Image suivante"
          @click="next"
        >
          <RiArrowRightSLine />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.project-gallery {
  display: flex;
  gap: var(--space-xs);
  overflow-x: auto;
  min-width: 0;
}

.project-gallery__thumb {
  flex: 0 0 auto;
  width: 8rem;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) - 4px);
  overflow: hidden;
  cursor: pointer;
  background: none;
}

.project-gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

/* Grisées pour les projets hors ligne : preuve du travail réalisé, sans
   laisser croire qu'on peut encore visiter le site. */
.project-gallery__thumb--grayscale {
  filter: grayscale(1) opacity(0.7);
}

.project-gallery__modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  background-color: rgba(10, 12, 18, 0.85);
}

.project-gallery__modal-image {
  max-width: min(90vw, 1100px);
  max-height: 85vh;
  border-radius: var(--radius);
  object-fit: contain;
}

/* Position absolue (pas flex à côté de l'image) : sur une image très large
   (proche de max-width), il ne restait plus de place dans la rangée flex et
   les flèches se retrouvaient coupées hors du viewport. En absolu, elles ne
   se disputent jamais l'espace avec l'image. */
.project-gallery__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  /* Fond sombre plein (pas translucide clair) : reste visible même quand une
     capture d'écran très claire se retrouve juste derrière le bouton. */
  background-color: rgba(17, 20, 28, 0.75);
  color: #ffffff;
  cursor: pointer;
}

.project-gallery__nav:hover {
  background-color: rgba(17, 20, 28, 0.9);
}

.project-gallery__nav--prev {
  left: var(--space-lg);
}

.project-gallery__nav--next {
  right: var(--space-lg);
}

/* Pas de fond ni de forme : juste une croix noire. */
.project-gallery__close {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  background: none;
  color: #ffffff;
  cursor: pointer;
}

.project-gallery__close :deep(svg),
.project-gallery__nav :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}
</style>
