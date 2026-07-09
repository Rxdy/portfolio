<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import TimelineItem from '@/components/molecules/TimelineItem.vue'
</script>

<template>
  <main class="journey page">
    <RouterLink class="journey__back" :to="{ path: '/', hash: '#education' }">
      ← Retour à l'accueil
    </RouterLink>

    <header class="journey__header">
      <BaseHeading :level="1">Mon parcours</BaseHeading>
      <p class="journey__lead">
        Mon chemin n'a pas été une ligne droite, et j'en suis fier. Entre mes études, il y a eu une
        étape de vie importante — et des expériences qui m'ont construit autrement que sur les bancs
        de l'école.
      </p>
    </header>

    <section class="journey__section">
      <BaseHeading :level="2">La vie active &amp; la famille</BaseHeading>
      <p class="journey__text">
        Après mon BTS, ma vie a pris un tournant : la création de ma famille. Il a fallu entrer dans
        la vie active, assumer mes responsabilités, et mettre les études en pause. Ce n'est pas un
        « trou » dans mon parcours : c'est une période où j'ai gagné en maturité, en organisation et
        en détermination. Quand j'ai repris mes études, c'était par choix et par passion.
      </p>
    </section>

    <section class="journey__section">
      <BaseHeading :level="2">L'expérience McDonald's</BaseHeading>
      <p class="journey__text">
        Chez McDonald's, j'ai d'abord travaillé comme équipier polyvalent sur deux contrats étudiants
        pendant mon BTS. Après l'arrêt de mes études en 2018, j'y suis revenu pour de bon — et j'y ai
        gravi tous les échelons.
      </p>
      <ul class="journey__timeline">
        <TimelineItem
          title="Manager"
          place="McDonald's"
          period="Nov. 2018 — Juil. 2023"
          description="Aboutissement de ma progression : équipier polyvalent, puis formateur, puis responsable de zone, et enfin manager. Encadrement d'équipe, formation, organisation du service et gestion des priorités en temps réel."
        />
        <TimelineItem
          title="Équipier polyvalent"
          place="McDonald's · pendant le BTS"
          period="2016 — 2018"
          description="Deux contrats étudiants menés en parallèle de mes études."
        />
      </ul>
    </section>

    <section class="journey__section">
      <BaseHeading :level="2">Le tournant vers la gestion de projet</BaseHeading>
      <p class="journey__text">
        C'est cette période, et surtout le rôle de manager, qui a été un vrai tournant. La gestion
        humaine, la coordination d'une équipe et la « préparation du terrain » avant chaque service
        font écho, pour moi, à la préparation d'un projet. J'ai réalisé que je voulais associer ça à
        ma passion première — l'informatique. C'est exactement ce que je fais aujourd'hui avec mon
        Master en gestion de projet informatique.
      </p>
    </section>

    <div class="journey__cta">
      <RouterLink class="journey__cta-link" :to="{ path: '/', hash: '#contact' }">
        Me contacter
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.journey {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.journey__back {
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color 0.18s ease;
}

.journey__back:hover {
  color: var(--color-primary);
}

.journey__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.journey__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.journey__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.journey__text {
  color: var(--color-text-muted);
  max-width: 44rem;
}

.journey__timeline {
  list-style: none;
}

.journey__cta-link {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  background-color: var(--color-secondary);
  color: #fff;
  font-weight: 600;
  transition: background-color 0.18s ease;
}

.journey__cta-link:hover {
  background-color: var(--color-secondary-hover);
}
</style>
