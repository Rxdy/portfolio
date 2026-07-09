# Revue critique du portfolio

_Dernière mise à jour : 2026-07-09 — analyse volontairement sans complaisance._

Le socle technique est **solide** (Vue 3 + TS, atomic design, thème clair/sombre, tests à 100 %, mobile-first). Les points ci-dessous sont ce qui **manque ou dessert** le portfolio aujourd'hui, par priorité.

---

## 🔴 Bloquant / important

### A. Aucune preuve concrète de travail
Les projets sont privés : le visiteur lit des compétences et des architectures, mais ne **voit** rien de produit. C'est du « je dis » sans « je montre » — la plus grosse faiblesse.
**Pistes** : captures/GIF anonymisés, 1-2 études de cas (contexte → problème → solution → résultat, sans exposer le repo), une démo publique, ou une mention « projets présentés en entretien ».

### B. Aucun lien professionnel
Pas de **LinkedIn**, pas de **CV téléchargeable**, pas de GitHub (même si privé, un profil peut être montré). Un recruteur cherche ça en premier.

### C. Déploiement production inexistant
Il n'y a qu'un **Docker de dev** (serveur Vite). Pour rxdy.fr il faut :
- un **build de prod** servi par nginx (ou Traefik, que tu maîtrises),
- un **Dockerfile de prod** multi-stage,
- le **fallback SPA** — sinon un refresh sur `/competences` renverra une page vide/404 en prod.

---

## 🟠 À traiter

### D. Les pourcentages de maîtrise sont subjectifs
« Vue 90 % » peut se retourner contre toi en entretien, et la page devient un « mur de barres ».
**Alternative** : des niveaux (Confirmé / Intermédiaire / Notions) ou regrouper. À défaut, assume et sois prêt à justifier chaque chiffre.

### E. Accessibilité
- Pas d'états **`:focus-visible`** → navigation clavier peu lisible.
- Le bleu secondaire (#1D488F) manque de **contraste** sur fond sombre.
- Vérifier le piège de focus dans le menu mobile ouvert.

### F. SEO & partage
Pas de balises **Open Graph / Twitter Card** → aperçus moches quand tu partages le lien. Pas d'image de partage, pas de sitemap.

### G. Vie privée
Le **numéro de téléphone en clair** = spam/scraping assuré. Envisager une obfuscation ou un formulaire de contact.

### H. Pas de CI
La couverture 100 % n'est **pas protégée** à chaque push. Un workflow GitHub Actions (test + type-check + coverage) la verrouillerait — et **matérialiserait** ta compétence CI/CD sur le portfolio lui-même.

---

## 🟡 Détails & finitions

- **I. Contenu placeholder** : logos en monogrammes → mettre les vrais avant publication.
- **J. Redondance des compétences** : tags (À propos) + barres (Compétences) + liste (Savoir-faire). S'assurer que ça paraît intentionnel et non répétitif.
- **K. Une seule langue (FR)** : cohérent pour le marché FR ; une version EN serait un plus (mais aligné avec ton choix de rester sobre sur l'anglais).
- **L. Contact = simple `mailto`** : pas de vrai formulaire (nécessiterait un back ou un service tiers).

---

## ✅ Points déjà solides (à garder)

- Architecture atomique claire et cohérente, composants réutilisables.
- **Couverture de tests 100 %** avec seuils verrouillés.
- Thème clair/sombre soigné, menu mobile repliable, anti-flash.
- Contenu personnel fort et assumé (parcours atypique, McDonald's → gestion de projet).

---

## 🎯 Ordre recommandé pour la suite
1. **C** — déploiement prod (nginx + Dockerfile prod + fallback SPA) → mettre en ligne.
2. **H** — CI GitHub Actions → protéger la qualité + prouver la compétence.
3. **B** — LinkedIn + CV téléchargeable.
4. **E / F** — focus states + Open Graph.
5. **A** — trouver un moyen de *montrer* du concret (études de cas anonymisées).
