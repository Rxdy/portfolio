# Récap du portfolio — trace

_Dernière mise à jour : 2026-07-09_

Portfolio personnel de **Rudy Alves** — domaine **rxdy.fr**.
Stack : **Vue 3 + TypeScript + Vite**, conteneurisé **Docker** (hot reload), **vue-router**, **@remixicon/vue**, tests **Vitest** (couverture **100 %**). Architecture en **atomic design** (`atoms` → `molecules` → `organisms` → `pages`), mobile-first, thème clair/sombre.

---

## 📥 Informations / éléments encore attendus de ta part

| # | Sujet | Détail | Où |
|---|-------|--------|----|
| 1 | **Pourcentages de maîtrise** | Ce sont mes estimations — à valider/ajuster | `frontend/src/pages/SkillsPage.vue` |
| 2 | **Logos** écoles & entreprises | Monogrammes (initiales) pour l'instant → déposer les vrais logos | `frontend/public/logos/` puis prop `logo` dans `SchoolsSection.vue` / `CompaniesSection.vue` |
| 3 | **« Self-Contained Systems »** | Confirmer que c'est bien le terme que tu cherchais | `ExpertiseSection.vue` |
| 4 | **Méthode 3-2-1-1** | Nom seul, ou explication au survol ? | `ExpertiseSection.vue` |
| 5 | **Collaboration** | Ton binôme : rester anonyme ou le nommer/créditer ? | `CollaborationSection.vue` |
| 6 | **Liens pro** | Ajouter LinkedIn / GitHub / CV téléchargeable ? (aucun pour l'instant) | header/footer |
| 7 | **Déploiement prod** | Manque : build prod (nginx), Dockerfile prod, fallback SPA | à créer |
| 8 | **CI/CD** | Workflow GitHub Actions (test + type-check + coverage) à mettre en place | `.github/workflows/` |

> ✅ **Résolu depuis** : dates Licence CNAM, dates McDo, dates CAVEM, alternance Def Systèmes, sigles (SIO/STI2D/SIN/SLAM), écoles.
> 🗑️ **Retiré** : la fonctionnalité « Mémoires & documents » (confidentialité entreprise).

---

## 🗂️ État des sections & pages

**Accueil (`/`)** : Hero · À propos · Expérience · Parcours & diplômes (→ lien vers écoles/entreprises) · Savoir-faire · Collaboration · Contact.

**Pages dédiées** :
- `/competences` — compétences détaillées avec barres de maîtrise
- `/ecoles-entreprises` — présentation des écoles & entreprises
- `/mon-parcours` — vie active + McDonald's + tournant vers la gestion de projet

**Savoir-faire mis en avant** : gestion de projet (planification, conduite du changement, démos client…), ingénierie & qualité (tests unit./intégration/E2E, CI/CD, Docker, Terraform), architecture & infra (3-tiers, micro-services, SCS, Traefik/nginx, scalabilité, réplication, workers Celery/Redis, 3-2-1-1), sécurité (mots de passe, chiffrement/certificats, rate limiting, secrets, tokens, QR codes).
