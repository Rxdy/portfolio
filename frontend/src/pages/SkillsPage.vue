<script setup lang="ts">
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import SkillBar, { type SkillLevel } from '@/components/molecules/SkillBar.vue'

interface Skill {
  label: string
  level: SkillLevel
}
interface Group {
  title: string
  skills: Skill[]
}

// NOTE(Rudy) : niveaux à ajuster librement (Notions / Intermédiaire / Confirmé).
const groups: Group[] = [
  {
    title: 'Langages & paradigmes',
    skills: [
      { label: 'TypeScript', level: 'Confirmé' },
      { label: 'JavaScript', level: 'Confirmé' },
      { label: 'Programmation orientée objet', level: 'Confirmé' },
      { label: 'SQL', level: 'Confirmé' },
      { label: 'Python', level: 'Intermédiaire' },
      { label: 'PHP', level: 'Intermédiaire' },
      { label: 'C / C++ / C#', level: 'Notions' },
      { label: 'Rust', level: 'Notions' },
      { label: 'Ruby', level: 'Notions' },
    ],
  },
  {
    title: 'Front-end',
    skills: [
      { label: 'Vue.js', level: 'Confirmé' },
      { label: 'HTML / CSS', level: 'Confirmé' },
      { label: 'Vue Router', level: 'Confirmé' },
      { label: 'Axios', level: 'Confirmé' },
      { label: 'Pinia', level: 'Confirmé' },
      { label: 'Sass', level: 'Confirmé' },
      { label: 'Tailwind CSS', level: 'Intermédiaire' },
      { label: 'Accessibilité (RGAA / WCAG)', level: 'Intermédiaire' },
    ],
  },
  {
    title: 'Back-end & bases de données',
    skills: [
      { label: 'Node.js', level: 'Confirmé' },
      { label: 'Fastify', level: 'Confirmé' },
      { label: 'PostgreSQL', level: 'Confirmé' },
      { label: 'Sequelize', level: 'Confirmé' },
      { label: 'Express', level: 'Intermédiaire' },
      { label: 'MySQL', level: 'Intermédiaire' },
      { label: 'SQL Server', level: 'Intermédiaire' },
      { label: 'WebSocket', level: 'Intermédiaire' },
      { label: 'Réplication de bases', level: 'Intermédiaire' },
      { label: 'Prisma', level: 'Intermédiaire' },
      { label: 'Bun', level: 'Intermédiaire' },
      { label: 'MongoDB', level: 'Notions' },
      { label: 'GraphQL', level: 'Notions' },
    ],
  },
  {
    title: 'Systèmes, infra & réseau',
    skills: [
      { label: 'Docker', level: 'Confirmé' },
      { label: 'Linux / terminal', level: 'Confirmé' },
      { label: 'Traefik', level: 'Intermédiaire' },
      { label: 'nginx', level: 'Intermédiaire' },
      { label: 'Terraform', level: 'Intermédiaire' },
      { label: 'Scalabilité (verticale & horizontale)', level: 'Intermédiaire' },
      { label: 'Raspberry Pi', level: 'Intermédiaire' },
      { label: 'Tomcat', level: 'Intermédiaire' },
      { label: 'Arduino', level: 'Intermédiaire' },
      { label: 'WAMP', level: 'Intermédiaire' },
      { label: 'Clusters', level: 'Notions' },
      { label: 'Kubernetes', level: 'Notions' },
      { label: 'Ansible', level: 'Notions' },
    ],
  },
  {
    title: 'Protocoles & sécurité',
    skills: [
      { label: 'HTTP', level: 'Confirmé' },
      { label: 'Hachage & chiffrement', level: 'Confirmé' },
      { label: 'Gestion des mots de passe', level: 'Confirmé' },
      { label: 'Tokens & JWT', level: 'Confirmé' },
      { label: 'Rate limiting', level: 'Intermédiaire' },
      { label: 'Gestion de certificats', level: 'Intermédiaire' },
      { label: 'MQTT', level: 'Intermédiaire' },
      { label: 'MLLP', level: 'Intermédiaire' },
    ],
  },
  {
    title: 'Outils & méthodes',
    skills: [
      { label: 'Git / GitHub', level: 'Confirmé' },
      { label: 'Markdown', level: 'Confirmé' },
      { label: 'Tests (unit. / intégration / E2E)', level: 'Confirmé' },
      { label: 'Makefile', level: 'Intermédiaire' },
      { label: 'PlantUML', level: 'Intermédiaire' },
      { label: 'Marp', level: 'Intermédiaire' },
      { label: 'CI/CD', level: 'Intermédiaire' },
      { label: 'Celery / Redis (workers)', level: 'Intermédiaire' },
    ],
  },
]
</script>

<template>
  <main class="skills page">
    <RouterLink class="skills__back" :to="{ path: '/', hash: '#about' }">
      ← Retour à l'accueil
    </RouterLink>

    <header class="skills__header">
      <BaseHeading :level="1">Mes compétences</BaseHeading>
      <p class="skills__lead">
        Un aperçu détaillé des langages, technologies et outils que j'ai appris et pratiqués, avec
        mon niveau de maîtrise.
      </p>
    </header>

    <section v-for="group in groups" :key="group.title" class="skills__group">
      <BaseHeading :level="2">{{ group.title }}</BaseHeading>
      <div class="skills__grid">
        <SkillBar
          v-for="skill in group.skills"
          :key="skill.label"
          :label="skill.label"
          :level="skill.level"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.skills {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.skills__back {
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color 0.18s ease;
}

.skills__back:hover {
  color: var(--color-primary);
}

.skills__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.skills__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}

.skills__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md) var(--space-lg);
}

@media (min-width: 640px) {
  .skills__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
