<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export type SkillLevel = 'Notions' | 'Intermédiaire' | 'Confirmé'

const props = defineProps<{
  /** Nom de la techno / du langage */
  label: string
  /** Niveau de maîtrise */
  level: SkillLevel
  /** Noms des projets (sur le portfolio) où cette compétence a été appliquée */
  projects?: string[]
}>()

// Correspondance niveau → remplissage de la barre
const LEVEL_WIDTH: Record<SkillLevel, number> = {
  Notions: 33,
  Intermédiaire: 66,
  Confirmé: 100,
}

const target = computed(() => LEVEL_WIDTH[props.level])

// La barre part de 0 puis s'anime jusqu'au niveau, au montage
const width = ref(0)
onMounted(() => {
  requestAnimationFrame(() => {
    width.value = target.value
  })
})
</script>

<template>
  <div class="skill-bar">
    <div class="skill-bar__head">
      <span class="skill-bar__label">{{ label }}</span>
      <span class="skill-bar__value">{{ level }}</span>
    </div>
    <div v-if="projects?.length" class="skill-bar__tags">
      <RouterLink
        v-for="project in projects"
        :key="project"
        class="skill-bar__tag"
        :to="{ name: 'projects' }"
        :title="`Compétence appliquée sur ${project} — projet disponible sur le portfolio`"
      >
        ↗ {{ project }}
      </RouterLink>
    </div>
    <div class="skill-bar__track">
      <div
        class="skill-bar__fill"
        :style="{ width: width + '%' }"
        role="progressbar"
        :aria-valuenow="target"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`${label} : ${level}`"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.skill-bar {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-bar__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.skill-bar__label {
  font-weight: 600;
}

.skill-bar__value {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.skill-bar__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.skill-bar__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.08rem 0.45rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 600;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

.skill-bar__tag:hover {
  border-color: var(--color-primary);
  background-color: var(--color-bg);
}

.skill-bar__track {
  height: 8px;
  border-radius: 999px;
  background-color: var(--color-border);
  overflow: hidden;
}

.skill-bar__fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
  transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
