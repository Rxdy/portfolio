export interface Experience {
  role: string
  org: string
  period: string
  description: string
  logo?: string
  link?: string
  linkLabel?: string
  /** 'tech' = montré dans « Mes entreprises » ; 'other' = uniquement sur le CV */
  category: 'tech' | 'other'
}

// Expérience professionnelle — source unique (section « Mes entreprises » + CV).
export const experiences: Experience[] = [
  {
    role: 'Développeur (alternance)',
    org: 'Def Systèmes — Saint-Étienne',
    period: 'depuis 2024',
    description:
      "Mon entreprise d'alternance pour la Licence puis le Master, après un stage d'un mois en juillet 2024. J'y développe sur des projets réels, dans un cadre professionnel.",
    logo: '/logos/def-systemes.png',
    link: 'https://def-systemes.fr',
    linkLabel: 'def-systemes.fr',
    category: 'tech',
  },
  {
    role: 'Stagiaire — service informatique',
    org: 'CAVEM — Saint-Raphaël',
    period: '2017 & 2018',
    description:
      "Communauté d'Agglomération Var Estérel Méditerranée. Deux stages au sein du service informatique pendant mon BTS SIO.",
    logo: '/logos/cavem.jpg',
    category: 'tech',
  },
  {
    // ⚠️ PROVISOIRE — détails (postes/dates/missions) à confirmer par Rudy (cf. projet/AVANCEMENT.md)
    role: 'Manager (équipier → formateur → responsable de zone → manager)',
    org: "McDonald's",
    period: 'Nov. 2018 — Juil. 2023',
    description:
      "Progression complète jusqu'au poste de manager : encadrement d'équipe, formation, organisation du service et gestion des priorités en temps réel. Une expérience humaine et opérationnelle qui nourrit aujourd'hui ma vision de la gestion de projet.",
    category: 'other',
  },
]

// Sous-ensemble « tech » pour la section « Mes entreprises ».
export const techExperiences = experiences.filter((e) => e.category === 'tech')
