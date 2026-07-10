<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import ContactForm from '@/components/organisms/ContactForm.vue'

const { t } = useI18n()
</script>

<template>
  <main class="contact-page page">
    <header class="contact-page__header">
      <BaseHeading :level="1">{{ t('contact.title') }}</BaseHeading>
      <p class="contact-page__lead">{{ t('contact.lead') }}</p>
    </header>

    <ContactForm />
  </main>
</template>

<style scoped>
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.contact-page {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.contact-page__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.contact-page__lead {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 44rem;
}
</style>
