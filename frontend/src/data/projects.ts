export interface Project {
  name: string
  /** Accroche d'une ligne */
  tagline: string
  description: string
  /** Technologies employées (badges) */
  stack: string[]
  /** Le projet est-il actuellement accessible en ligne ? */
  online: boolean
  /** Captures d'écran (chemins dans /public/screenshots), ajoutées projet par projet */
  screenshots?: string[]
  /** Lien du dépôt */
  repo?: string
  /** Lien d'une démo en ligne (optionnel) */
  demo?: string
  /**
   * Compétences (intitulés EXACTS de `skills.ts`) réellement appliquées sur ce projet.
   * Sert à afficher un tag « preuve » sur la page Compétences.
   */
  skills?: string[]
}

// Organisation GitHub où Rudy mène des projets communs avec son collègue.
export const projectsOrg = {
  name: 'Abend-core',
  url: 'https://github.com/Abend-core',
}

// Projets — source unique (section d'accueil, page /projets, CV).
export const projects: Project[] = [
  {
    name: 'rxdy.fr',
    tagline: 'Portfolio de Rudy Alves',
    description:
      "Ce portfolio lui-même : contenu centralisé dans une source unique de données, réutilisée à la fois par les pages du site et pour générer le CV téléchargeable. Sélecteur de langue FR/EN, thème clair/sombre, accessibilité (RGAA/WCAG). Backend Fastify dédié pour le formulaire de contact (envoi d'email via SMTP, validation, rate limiting). Conteneurisé avec Docker (dev en hot-reload, prod via nginx avec fallback SPA), CI GitHub Actions, couverture de tests verrouillée à 100 % sur les deux services.",
    stack: ['Vue.js', 'TypeScript', 'Vite', 'vue-i18n', 'Fastify', 'Node.js', 'Docker'],
    online: true,
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'TypeScript',
      'Vue Router',
      'vue-i18n (internationalisation)',
      'Vite',
      'HTML / CSS',
      'Design responsive / mobile-first',
      'Accessibilité (RGAA / WCAG)',
      'Node.js',
      'Fastify',
      'Conception d’API REST',
      'HTTP',
      'Nodemailer (envoi d’emails)',
      'CORS',
      'Rate limiting',
      'Helmet (en-têtes de sécurité)',
      'Docker',
      'Docker Compose',
      'nginx',
      'Git / GitHub',
      'Tests (unit. / intégration / E2E)',
      'CI/CD',
      'GitHub Actions',
    ],
  },
  {
    name: 'Abloue',
    tagline: 'Carte interactive des départements français',
    description:
      "Application web de visualisation et de gestion de données géographiques par département. Carte de France cliquable, filtres par nom et localisation, affichage en cartes, le tout 100 % côté client et responsive. Carte SVG (Abcarte) personnalisée.",
    stack: ['HTML', 'JavaScript', 'CSS', 'jQuery', 'SVG'],
    online: false,
    repo: 'https://github.com/Abend-core/Abloue',
    screenshots: ['/screenshots/abloue-1-carte.png', '/screenshots/abloue-2-departement.png'],
    // Intitulés EXACTS présents dans skills.ts
    skills: ['HTML / CSS', 'JavaScript', 'Design responsive / mobile-first', 'Git / GitHub'],
  },
  {
    name: 'Abyss',
    tagline: 'Gestionnaire de dépenses personnelles',
    description:
      "Application web moderne pour suivre et gérer ses finances personnelles : dashboard avec KPIs et graphiques interactifs, catégories de dépenses hiérarchiques et personnalisables, opérations récurrentes (quotidiennes/hebdomadaires/mensuelles). API Fastify avec Prisma (migrations versionnées), documentation Swagger/OpenAPI, authentification par JWT et mots de passe hachés (bcrypt), données sensibles chiffrées. Interface responsive en PWA installable avec thème clair/sombre, compte de démonstration pré-rempli.",
    stack: ['Vue.js', 'Vite', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
    online: false,
    repo: 'https://github.com/Abend-core/Abyss',
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'Vite',
      'Node.js',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'Migrations de bases',
      'Docker',
      'Docker Compose',
      'Git / GitHub',
      'Tokens & JWT',
      'PWA (Progressive Web App)',
      'HTTP',
      'HTTPS / TLS',
      'CORS',
      'Helmet (en-têtes de sécurité)',
      'Swagger / OpenAPI',
      'Hachage',
      'Chiffrement',
      'Gestion des mots de passe',
      'Conception d’API REST',
    ],
  },
  {
    name: 'AbView',
    tagline: 'Tableau de bord familial — calendrier, météo, récap annuel',
    description:
      "Tableau de bord affiché en continu sur un écran à la maison : calendrier partagé synchronisé avec Google Calendar (gestion des plannings de chaque membre du foyer), météo avec archivage annuel, liste de tâches, mise en avant des événements spéciaux (anniversaires, jours fériés), et récapitulatif animé façon « wrapped » en fin d'année. Déployé en autonomie sur mon Raspberry Pi, avec nom de domaine dédié, accès distant par tunnel SSH (authentification par clé) et déploiement continu.",
    stack: ['Vue.js', 'TypeScript', 'AdonisJS', 'MySQL', 'Docker'],
    online: false,
    repo: 'https://github.com/Rxdy/abview',
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'TypeScript',
      'Pinia',
      'Vue Router',
      'Axios',
      'Node.js',
      'AdonisJS',
      'MySQL',
      'Docker',
      'Docker Compose',
      'Git / GitHub',
      'ESLint / Prettier',
      'CI/CD',
      'GitHub Actions',
      'Watchtower',
      'DNS & nom de domaine',
      'HTTP',
      'HTTPS / TLS',
      'SSL/TLS & Let’s Encrypt',
      'SSH (clés, tunnels)',
      'CORS',
      'Conception d’API REST',
      'Raspberry Pi',
      'Tests (unit. / intégration / E2E)',
    ],
  },
  {
    name: 'Queens',
    tagline: 'Résolveur du puzzle Queens et comparateur d’algorithmes',
    description:
      "Application interactive pour résoudre le puzzle Queens (une reine par zone colorée, sans partager ligne, colonne, diagonale ni case adjacente). Permet de dessiner une grille ou d'importer une image de plateau, puis compare deux algorithmes de résolution : un modèle de raisonnement inspiré des Transformers (TRM) et une approche classique (glouton + recherche locale), avec limitation du débit d'appels (rate limiting) et benchmark des performances. Déployé sur mon Raspberry Pi, accessible à distance en SSH via un tunnel VPN (Tailscale).",
    stack: ['Vue.js', 'Vite', 'Python', 'FastAPI', 'Docker'],
    online: true,
    screenshots: [
      '/screenshots/queens-1-jeu.png',
      '/screenshots/queens-2-solveur.png',
      '/screenshots/queens-3-historique.png',
      '/screenshots/queens-4-stats.png',
    ],
    repo: 'https://github.com/Rxdy/queens',
    demo: 'https://queens.rxdy.fr',
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'Vite',
      'Axios',
      '@vueuse/core',
      'Python',
      'FastAPI',
      'Docker',
      'Docker Compose',
      'Git / GitHub',
      'ESLint / Prettier',
      'Makefile',
      'CI/CD',
      'GitHub Actions',
      'Watchtower',
      'HTTP',
      'CORS',
      'Rate limiting',
      'Conception d’API REST',
      'Tests (unit. / intégration / E2E)',
      'Raspberry Pi',
      'SSH (clés, tunnels)',
      'VPN',
    ],
  },
  {
    name: 'FutureKawa',
    tagline: 'Plateforme multi-services en architecture Self-Contained Systems',
    description:
      "Plateforme découpée en services autonomes (Self-Contained Systems) : deux domaines métier — « siège » et « exploitation » — chacun avec son propre frontend Vue.js, sa propre API Django REST (documentée en Swagger/OpenAPI) et sa propre base PostgreSQL. Le domaine « exploitation » orchestre des tâches asynchrones avec Celery/Redis et reçoit en temps réel les données de capteurs via un broker MQTT (Mosquitto), alimenté par un firmware Arduino/C tournant sur ESP32. Infrastructure as Code avec Terraform pour le déploiement Docker, CI GitLab (tests automatisés sur push/merge request).",
    stack: ['Vue.js', 'Django', 'PostgreSQL', 'Celery', 'MQTT', 'Arduino', 'Terraform', 'Docker'],
    online: false,
    repo: 'https://gitlab.com/R_dy/futurekawa',
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'Pinia',
      'Vue Router',
      'Axios',
      'Python',
      'Django',
      'PostgreSQL',
      'SQL',
      'JSON / YAML',
      'Conception d’API REST',
      'CORS',
      'Swagger / OpenAPI',
      'Celery / Redis (workers)',
      'MQTT',
      'Mosquitto (broker MQTT)',
      'Arduino',
      'C / C++',
      'HTTP',
      'Terraform',
      'Docker',
      'Git / GitHub',
      'CI/CD',
      'Tests (unit. / intégration / E2E)',
    ],
  },
  {
    name: 'Infra',
    tagline: 'Reverse proxy Traefik pour héberger mes projets sur mon Raspberry Pi',
    description:
      "Reverse proxy partagé par tous les projets hébergés sur mon Raspberry Pi personnel : certificats HTTPS générés et renouvelés automatiquement via Let's Encrypt (challenge HTTP), sous-domaines en wildcard DNS, découverte automatique des nouveaux services via les labels Docker (aucune modification de ce repo nécessaire pour brancher un nouveau projet). Branches main/dev protégées, CI validant la syntaxe docker-compose et détectant les secrets committés avant de merger. Accès SSH et dashboard restreints au réseau VPN, rotation des logs.",
    stack: ['Traefik', 'Docker', 'Let’s Encrypt', 'GitHub Actions'],
    online: false,
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Traefik',
      'Docker',
      'Docker Compose',
      'DNS & nom de domaine',
      'SSL/TLS & Let’s Encrypt',
      'HTTPS / TLS',
      'Gestion de certificats',
      'CI/CD',
      'GitHub Actions',
      'SSH (clés, tunnels)',
      'VPN',
      'Raspberry Pi',
    ],
  },
  {
    name: 'Metryx',
    tagline: 'Dashboard de monitoring système pour mon Raspberry Pi',
    description:
      "Tableau de bord de supervision : CPU, RAM, température, disque, réseau et containers Docker actifs, consultable depuis un navigateur mobile ou desktop, avec historique et graphiques en direct. Une page dédiée liste les containers actifs groupés par projet docker-compose, protégée par authentification car elle révèle les noms des projets hébergés — le reste du dashboard reste public. Le backend n'a accès au démon Docker qu'au travers d'un proxy en lecture seule (docker-socket-proxy), jamais du socket directement. Déployé sur mon Raspberry Pi, avec CI multi-arch (amd64/arm64) et déploiement continu via Watchtower.",
    stack: ['Vue.js', 'TypeScript', 'Vite', 'Chart.js', 'Node.js', 'Express', 'Docker'],
    online: true,
    repo: 'https://github.com/Rxdy/metryx',
    demo: 'https://metryx.rxdy.fr',
    // Intitulés EXACTS présents dans skills.ts
    skills: [
      'Vue.js',
      'TypeScript',
      'Vue Router',
      'Vite',
      'Design responsive / mobile-first',
      'Node.js',
      'Express',
      'Conception d’API REST',
      'HTTP',
      'Rate limiting',
      'Hachage',
      'Gestion des mots de passe',
      'Docker',
      'Docker Compose',
      'Traefik',
      'nginx',
      'Git / GitHub',
      'ESLint / Prettier',
      'Tests (unit. / intégration / E2E)',
      'CI/CD',
      'GitHub Actions',
      'Watchtower',
      'Raspberry Pi',
    ],
  },
]

/** Projets ayant appliqué une compétence donnée (par intitulé exact). */
export function projectsUsingSkill(skillLabel: string): Project[] {
  return projects.filter((p) => p.skills?.includes(skillLabel))
}
