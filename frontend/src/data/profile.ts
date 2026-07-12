// Identité & contact — source unique partagée (Hero, footer, CV).
export const profile = {
  name: 'Rudy Alves',
  title: 'Développeur web',
  // Accroche réutilisée par le Hero et le CV
  summary:
    "Développeur web passionné. Ça fait des années que je crée des projets — surtout des applications web et des APIs — avec Vue, TypeScript et Node.js. J'aime partir d'une idée et la voir prendre vie.",
  // 12 mai 1997 (mois indexé à 0)
  birthDate: new Date(1997, 4, 12),
  location: 'Saint-Just Saint-Rambert (42)',
  drivingLicense: 'Permis B',
  // Avatar utilisé en attendant une vraie photo de profil de Rudy
  photo: '/people/rudy.jpg',
  // Affiché sur le CV téléchargeable, PAS en clair sur le site public
  email: 'contact@rxdy.fr',
  github: 'https://github.com/rxdy',
}

// Âge calculé — reste juste sans maintenance.
export function computeAge(birth: Date = profile.birthDate, today = new Date()): number {
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
  return age
}
