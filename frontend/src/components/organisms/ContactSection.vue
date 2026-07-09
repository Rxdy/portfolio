<script setup lang="ts">
import { RiMapPinLine, RiCarLine, RiGithubLine } from '@remixicon/vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import ContactForm from '@/components/organisms/ContactForm.vue'

const infos = [
  { icon: RiMapPinLine, label: 'Saint-Just Saint-Rambert (42)' },
  { icon: RiCarLine, label: 'Permis B' },
  { icon: RiGithubLine, label: 'github.com/rxdy', href: 'https://github.com/rxdy' },
]
</script>

<template>
  <section id="contact" class="contact">
    <BaseHeading :level="2">Contact</BaseHeading>
    <p class="contact__text">
      Une idée de projet, une opportunité, ou simplement envie d'échanger ? Écris-moi via le
      formulaire.
    </p>

    <div class="contact__layout">
      <ContactForm />

      <ul class="contact__infos">
        <li v-for="item in infos" :key="item.label" class="contact__info">
          <component :is="item.icon" class="contact__icon" />
          <a v-if="item.href" :href="item.href" target="_blank" rel="noopener">{{ item.label }}</a>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.contact__text {
  max-width: 40rem;
  color: var(--color-text-muted);
}

.contact__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  width: 100%;
}

.contact__infos {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.contact__info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
}

.contact__info a:hover {
  color: var(--color-primary);
}

.contact__icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--color-primary);
  fill: currentColor;
  flex-shrink: 0;
}

@media (min-width: 720px) {
  .contact__layout {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}
</style>
