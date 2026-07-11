# Portfolio — Rudy Alves (rxdy.fr)

Portfolio personnel construit avec **Vue 3 + TypeScript + Vite**, conteneurisé avec **Docker** (hot reload), en **atomic design**, avec thème clair/sombre, sélecteur de langue **FR/EN**, et une couverture de tests à **100 %**.

Le contenu (profil, compétences, expériences, projets, diplômes) vit dans `frontend/src/data/` et sert à la fois les pages du site et le **CV généré depuis ces mêmes données** (page `/cv`, exporté en PDF via l'impression du navigateur) : une seule source à tenir à jour.

Un petit backend **Fastify** (`backend/`) gère l'envoi d'email du formulaire de contact via un **serveur SMTP générique** (configuré uniquement par variables d'environnement, aucun fournisseur codé en dur).

## 🚀 Démarrage (Docker)

```bash
docker compose up -d --build   # démarre le serveur de dev (http://localhost:5173)
docker compose logs -f         # suivre les logs
docker compose down            # arrêter
```

## 🧰 Scripts

Identiques dans `frontend/` et `backend/` :

```bash
npm run dev          # serveur de dev (Vite / tsx watch)
npm run build        # build de production
npm run type-check   # vérification TypeScript
npm run test         # tests unitaires (Vitest)
npm run coverage     # tests + couverture (seuils à 100 %)
```

## 🗂️ Structure

```
portfolio/
├── docker-compose.yml           # dev (hot reload)
├── docker-compose.prod.yml      # prod (nginx + backend)
├── .github/workflows/ci.yml     # pipeline CI (frontend + backend)
├── .env.example                 # variables SMTP à copier en .env (non commité)
├── frontend/                    # application Vue (un dossier par service)
│   ├── Dockerfile               # image de dev
│   ├── Dockerfile.prod          # image de prod (build → nginx + fallback SPA)
│   ├── nginx.conf               # config nginx (fallback SPA + proxy /api)
│   └── src/
│       ├── components/{atoms,molecules,organisms}
│       ├── pages/               # Home, Skills, Projects, Contact, CV, Journey...
│       ├── data/                # source unique du contenu (site + CV)
│       ├── i18n/                # dictionnaires FR/EN (vue-i18n)
│       ├── composables/         # useTheme, useLocale
│       ├── router/
│       └── test/                # helpers + setup de test
└── backend/                     # API Fastify (formulaire de contact)
    ├── Dockerfile               # image de dev
    ├── Dockerfile.prod          # image de prod
    └── src/
        ├── server.ts            # bootstrap Fastify (cors, helmet, rate-limit)
        ├── routes/contact.ts    # POST /api/contact
        └── services/mailer.ts   # envoi d'email via SMTP générique (Nodemailer)
```

> Les dossiers `projet/` (suivi, audits) et `agent/` (règles de l'agent) sont **gitignorés** : suivi local, non publié.

## ✉️ Formulaire de contact (SMTP)

Le backend n'assume **aucun fournisseur d'email** : il relaie via le serveur SMTP défini dans les variables d'environnement. Copier `.env.example` en `.env` à la racine et renseigner :

```
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Portfolio rxdy.fr <no-reply@rxdy.fr>"
CONTACT_TO=rudyalvs@gmail.com
```

## 🚢 Déploiement (production)

À chaque push sur `main`, la CI construit et pousse les images `ghcr.io/rxdy/portfolio-frontend` et `ghcr.io/rxdy/portfolio-backend` (tags `latest` + SHA du commit).

```bash
# En local (build depuis les sources)
docker compose -f docker-compose.prod.yml up -d --build   # build + nginx (http://localhost:8099)

# Sur le serveur cible (Raspberry Pi…), en tirant les images déjà construites par la CI
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

L'image de prod construit l'app puis la sert via **nginx** avec un **fallback SPA** (`try_files … /index.html`) et relaie `/api/` vers le backend Fastify : les routes comme `/competences` fonctionnent au rafraîchissement, et le formulaire de contact passe par le même domaine. Les balises **Open Graph** et l'image `og-image.png` assurent un bon aperçu au partage.

## 🌱 Workflow Git

Modèle de branches : **`main` → `dev` → `feature/*`**.

- **`main`** — branche stable, uniquement du code validé et prêt à déployer.
- **`dev`** — branche d'intégration : on y fusionne les fonctionnalités terminées.
- **`feature/<nom>`** — une branche par fonctionnalité, créée **depuis `dev`**.

```bash
# Nouvelle fonctionnalité
git checkout dev
git pull
git checkout -b feature/ma-fonctionnalite

# ... commits ...

# Fusion : feature -> dev (via Pull Request de préférence)
git checkout dev
git merge --no-ff feature/ma-fonctionnalite

# Mise en production : dev -> main (via Pull Request)
git checkout main
git merge --no-ff dev
```

La CI (GitHub Actions) s'exécute sur chaque push et PR vers `main` et `dev` : **type-check + tests (couverture 100 %) + build**, pour le `frontend/` et le `backend/`.
