export interface Diploma {
  title: string
  place: string
  period: string
  /** Précision optionnelle (alternance, formation initiale...) */
  detail?: string
}

// Parcours scolaire — le plus récent en premier. Source unique (accueil + CV).
export const diplomas: Diploma[] = [
  {
    title: 'Master — Gestion de projet informatique',
    place: 'IRUP · Saint-Étienne',
    period: 'Sept. 2025 — Juil. 2027',
    detail: 'En cours · en alternance chez Def Systèmes',
  },
  {
    title: 'Licence — Informatique générale, spécialité développement',
    place: 'CNAM · Montbrison',
    period: 'Sept. 2024 — Juil. 2025',
    detail: 'En alternance chez Def Systèmes',
  },
  {
    title: 'BTS SIO option SLAM — Services Informatiques aux Organisations',
    place: 'Lycée Antoine de Saint-Exupéry · Saint-Raphaël',
    period: 'Sept. 2016 — Juin 2018',
    detail: 'Formation initiale · SLAM : Solutions Logicielles et Applications Métiers',
  },
  {
    title: 'Baccalauréat STI2D — spécialité SIN',
    place: 'Lycée François Mauriac · Andrézieux-Bouthéon',
    period: '2015 — 2016',
    detail:
      'Sciences et Technologies de l’Industrie et du Développement Durable · Systèmes d’Information et Numérique',
  },
]
