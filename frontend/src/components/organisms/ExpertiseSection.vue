<script setup lang="ts">
import { markRaw } from 'vue'
import { RiTeamLine, RiTestTubeLine, RiStackLine, RiShieldKeyholeLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import CapabilityCard from '@/components/molecules/CapabilityCard.vue'

const capabilities = [
  {
    icon: markRaw(RiTeamLine),
    title: 'Gestion de projet',
    items: [
      'Planification & cadrage des besoins',
      'Conduite du changement',
      'Gestion des risques',
      'Méthodes agiles (Scrum / Kanban)',
      "Coordination d'équipe",
      'Démonstrations client (préparation & scénarios)',
    ],
  },
  {
    icon: markRaw(RiTestTubeLine),
    title: 'Ingénierie & qualité',
    items: [
      'Tests unitaires, d’intégration et E2E',
      'Pipelines CI/CD',
      'Conteneurisation Docker',
      'Infrastructure as Code (Terraform)',
      'Accessibilité web (RGAA / WCAG)',
      'Revue de code & bonnes pratiques',
    ],
  },
  {
    icon: markRaw(RiStackLine),
    title: 'Architecture & infrastructure',
    items: [
      'Architecture 3-tiers, micro-services',
      'Self-Contained Systems (services autonomes)',
      'APIs REST (notions GraphQL) & temps réel (WebSocket / MQTT)',
      'ORM (Sequelize, Prisma) & réplication de bases',
      "Workers & files d'attente (Celery / Redis)",
      'Reverse proxy & déploiement (Traefik, nginx)',
      'Scalabilité verticale & horizontale',
      'Plans de maintenance BDD (méthode 3-2-1-1)',
    ],
  },
  {
    icon: markRaw(RiShieldKeyholeLine),
    title: 'Sécurité applicative',
    items: [
      'Gestion des mots de passe (soutenance dédiée)',
      'Chiffrement, hachage & gestion de certificats',
      'Rate limiting',
      'Variables d’environnement & gestion des secrets',
      'Tokens à expiration (réinitialisation de mot de passe)',
      'Génération & vérification de QR codes',
    ],
  },
]
</script>

<template>
  <section id="expertise" class="expertise">
    <BaseHeading :level="2">Mon savoir-faire</BaseHeading>
    <p class="expertise__intro">
      Au-delà du code, j'interviens sur l'ensemble du cycle d'un projet — de la planification à la
      mise en production — avec une exigence de qualité et des architectures pensées pour durer.
    </p>
    <div class="expertise__grid">
      <CapabilityCard
        v-for="cap in capabilities"
        :key="cap.title"
        :icon="cap.icon"
        :title="cap.title"
        :items="cap.items"
      />
    </div>
  </section>
</template>

<style scoped>
.expertise {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.expertise__intro {
  max-width: 44rem;
  color: var(--color-text-muted);
}

.expertise__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
}
</style>
