<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Niveau sémantique du titre (h1 → h4) */
    level?: 1 | 2 | 3 | 4
  }>(),
  { level: 2 },
)
</script>

<template>
  <component :is="`h${level}`" class="base-heading" :class="`base-heading--h${level}`">
    <slot />
  </component>
</template>

<style scoped>
.base-heading {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.base-heading--h1 {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
}

.base-heading--h2 {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
}

.base-heading--h3 {
  font-size: 1.25rem;
}

.base-heading--h4 {
  font-size: 1rem;
}
</style>
