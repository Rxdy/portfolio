# Portfolio — Rudy Alves (rxdy.fr)

Portfolio personnel construit avec **Vue 3 + TypeScript + Vite**, conteneurisé avec **Docker** (hot reload), en **atomic design**, avec thème clair/sombre et une couverture de tests à **100 %**.

## 🚀 Démarrage (Docker)

```bash
docker compose up -d --build   # démarre le serveur de dev (http://localhost:5173)
docker compose logs -f         # suivre les logs
docker compose down            # arrêter
```

## 🧰 Scripts (dans `frontend/`)

```bash
npm run dev          # serveur de dev Vite
npm run build        # type-check + build de production
npm run type-check   # vérification TypeScript (vue-tsc)
npm run test         # tests unitaires (Vitest)
npm run coverage     # tests + couverture (seuils à 100 %)
```

## 🗂️ Structure

```
portfolio/
├── docker-compose.yml
├── .github/workflows/ci.yml     # pipeline CI (type-check, tests, build)
├── RECAP.md                     # infos attendues + état
├── REVUE-CRITIQUE.md            # revue critique
└── frontend/                    # application Vue (un dossier par service)
    └── src/
        ├── components/{atoms,molecules,organisms}
        ├── pages/               # HomePage, SkillsPage, JourneyPage, EducationDetailPage
        ├── composables/         # useTheme
        ├── router/
        └── test/                # helpers de test
```

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

La CI (GitHub Actions) s'exécute sur chaque push et PR vers `main` et `dev` : **type-check + tests (couverture 100 %) + build**.
