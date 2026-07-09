<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export type SkillLevel = 'Notions' | 'Intermédiaire' | 'Confirmé'

const props = defineProps<{
  /** Nom de la techno / du langage */
  label: string
  /** Niveau de maîtrise */
  level: SkillLevel
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
