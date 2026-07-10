// Textes d'interface fixes uniquement (nav, boutons, titres de section, labels).
// Le contenu personnel (bio, expériences, CV, descriptions de projets/compétences...)
// reste en français pour l'instant — voir src/data/*.ts et les pages qui les consomment.
export default {
  theme: {
    toLight: 'Passer en mode clair',
    toDark: 'Passer en mode sombre',
  },
  locale: {
    toggle: 'Changer de langue',
  },
  nav: {
    home: 'Accueil',
    projects: 'Projets',
    collaboration: 'Collaboration',
    contact: 'Contact',
    toggleMenu: 'Ouvrir ou fermer le menu',
    github: 'Mon profil GitHub (nouvel onglet)',
  },
  common: {
    readMore: 'En savoir plus →',
  },
  hero: {
    eyebrow: 'Bonjour, je suis',
    ctaExpertise: 'Voir mon savoir-faire',
    ctaContact: 'Me contacter',
    ctaCv: 'Mon CV',
  },
  about: {
    title: 'À propos',
    stackTitle: 'Mes technos de prédilection',
    skillsLink: 'Voir toutes mes compétences en détail →',
    languagesTitle: 'Langues',
  },
  experience: {
    title: 'Expérience',
  },
  education: {
    title: 'Parcours & diplômes',
    link: 'Voir mes écoles & entreprises en détail →',
  },
  expertise: {
    title: 'Mon savoir-faire',
  },
  schools: {
    title: 'Mes écoles',
  },
  companies: {
    title: 'Mes entreprises',
  },
  projectCard: {
    repo: 'Code source',
    demo: 'Démo',
  },
  projects: {
    title: 'Mes projets',
    lead: 'Des projets que je construis pour apprendre et pour le plaisir de créer — seul ou en collaboration.',
  },
  collaboration: {
    title: 'Collaboration',
    lead: "Je n'avance pas seul : voici comment je travaille avec les autres, et où ça nous mène.",
    orgTitle: 'Organisation {org}',
    duoTitle: 'Un binôme de confiance',
    companyTitle: 'Créer une entreprise',
  },
  contact: {
    title: 'Contact',
    lead: "Une idée de projet, une opportunité, ou simplement envie d'échanger ? Écris-moi via le formulaire.",
  },
  contactForm: {
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    required: 'Tous les champs sont obligatoires.',
    send: 'Envoyer',
    sending: 'Envoi…',
    success: 'Merci ! Ton message a bien été envoyé, je te réponds vite.',
    error: 'Une erreur est survenue. Réessaie dans un instant.',
  },
  skills: {
    title: 'Mes compétences',
    lead: "Un aperçu détaillé des langages, technologies et outils que j'ai appris et pratiqués, avec mon niveau de maîtrise.",
  },
  educationDetail: {
    title: 'Mes écoles & entreprises',
    lead: "Le détail des établissements qui ont jalonné ma formation et des structures dans lesquelles j'ai travaillé.",
  },
  journey: {
    title: 'Mon parcours',
    lead: "Mon chemin n'a pas été une ligne droite, et j'en suis fier. Entre mes études, il y a eu une étape de vie importante — et des expériences qui m'ont construit autrement que sur les bancs de l'école.",
    section1Title: 'La vie active & la famille',
    section2Title: "L'expérience McDonald's",
    section3Title: 'Le tournant vers la gestion de projet',
    cta: 'Me contacter',
  },
  entityCard: {
    defaultLink: 'Voir le site',
  },
  footer: {
    contactTitle: 'Coordonnées',
    contactLink: 'Me contacter',
    cvLink: 'Mon CV',
    legalTitle: 'Légal',
    legalLink: 'Mentions légales & confidentialité',
    stackTitle: 'Stack & crédits',
    top: 'Haut de page',
  },
}
