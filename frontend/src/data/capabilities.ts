import { markRaw, type Component } from 'vue'
import { RiTeamLine, RiTestTubeLine, RiStackLine, RiShieldKeyholeLine, RiRocketLine } from '@remixicon/vue'

export interface Capability {
  icon: Component
  title: string
  /** Résumé d'une ligne affiché sur l'accueil */
  summary: string
  /** Détail complet affiché sur la page dédiée */
  items: string[]
}

// Savoir-faire — source unique partagée entre l'accueil (résumé) et la page détaillée.
export const capabilities: Capability[] = [
  {
    icon: markRaw(RiTeamLine),
    title: 'Gestion de projet',
    summary: "Cadrage, méthodes agiles et coordination d'équipe, de l'idée à la livraison.",
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
    summary: 'Tests, CI/CD, conteneurisation et bonnes pratiques pour un code fiable.',
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
    summary: 'Architectures scalables, APIs, bases répliquées et déploiement maîtrisé.',
    items: [
      'Architecture 3-tiers, micro-services',
      'Self-Contained Systems (services autonomes)',
      'APIs REST (notions GraphQL) & temps réel (WebSocket / MQTT)',
      'ORM (Sequelize, Prisma) & réplication de bases',
      "Workers & files d'attente (Celery / Redis)",
      'Scalabilité verticale & horizontale',
    ],
  },
  {
    icon: markRaw(RiRocketLine),
    title: 'Déploiement & exploitation',
    summary: 'Mise en production, supervision et maintien en conditions opérationnelles.',
    items: [
      'Mise en production (go-live) & déploiement continu',
      'Auto-déploiement (Watchtower)',
      'Reverse proxy & certificats (Traefik, nginx, Let’s Encrypt)',
      'Supervision & monitoring (dashboards, alertes)',
      'Sauvegardes & plans de reprise (méthode 3-2-1-1)',
      'DNS & noms de domaine',
    ],
  },
  {
    icon: markRaw(RiShieldKeyholeLine),
    title: 'Sécurité applicative',
    summary: 'Gestion des secrets, chiffrement et protection des accès applicatifs.',
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
