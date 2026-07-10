<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type Status = 'idle' | 'sending' | 'success' | 'error'

// Point d'entrée du back (à brancher lors du déploiement). Voir RECAP.md.
const ENDPOINT = '/api/contact'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<Status>('idle')

const nameOk = computed(() => name.value.trim().length > 0)
const emailOk = computed(() => EMAIL_RE.test(email.value))
const messageOk = computed(() => message.value.trim().length >= 10)
const canSubmit = computed(() => [nameOk.value, emailOk.value, messageOk.value].every(Boolean))
const submitDisabled = computed(() =>
  [!canSubmit.value, status.value === 'sending'].some(Boolean),
)

async function submit() {
  if (!canSubmit.value) return
  status.value = 'sending'
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, message: message.value }),
    })
    if (!res.ok) throw new Error('http')
    status.value = 'success'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="submit">
    <div class="contact-form__field">
      <label for="cf-name">{{ t('contactForm.name') }} <span class="contact-form__required" aria-hidden="true">*</span></label>
      <input id="cf-name" v-model="name" type="text" autocomplete="name" required aria-required="true" />
    </div>

    <div class="contact-form__field">
      <label for="cf-email">{{ t('contactForm.email') }} <span class="contact-form__required" aria-hidden="true">*</span></label>
      <input id="cf-email" v-model="email" type="email" autocomplete="email" required aria-required="true" />
    </div>

    <div class="contact-form__field">
      <label for="cf-message">{{ t('contactForm.message') }} <span class="contact-form__required" aria-hidden="true">*</span></label>
      <textarea id="cf-message" v-model="message" rows="5" required aria-required="true"></textarea>
    </div>

    <p class="contact-form__hint">{{ t('contactForm.required') }}</p>

    <button class="contact-form__submit" type="submit" :disabled="submitDisabled">
      {{ status === 'sending' ? t('contactForm.sending') : t('contactForm.send') }}
    </button>

    <p v-if="status === 'success'" class="contact-form__msg contact-form__msg--ok" role="status">
      {{ t('contactForm.success') }}
    </p>
    <p
      v-else-if="status === 'error'"
      class="contact-form__msg contact-form__msg--ko"
      role="alert"
    >
      {{ t('contactForm.error') }}
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-form__field label {
  font-weight: 600;
  font-size: 0.9rem;
}

.contact-form__required {
  color: var(--color-primary);
}

.contact-form__hint {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.contact-form__field input,
.contact-form__field textarea {
  font: inherit;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-sm) var(--space-md);
  resize: vertical;
}

.contact-form__field input:focus,
.contact-form__field textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.contact-form__submit {
  align-self: flex-start;
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius);
  background-color: var(--color-primary);
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease;
}

.contact-form__submit:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.contact-form__submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-form__msg {
  font-weight: 500;
}

.contact-form__msg--ok {
  color: #1f9d61;
}

.contact-form__msg--ko {
  color: #e05563;
}
</style>
