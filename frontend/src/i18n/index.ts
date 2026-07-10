import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import en from './locales/en'

export type Locale = 'fr' | 'en'

function readInitial(): Locale {
  const stored = localStorage.getItem('locale')
  return stored === 'fr' || stored === 'en' ? stored : 'fr'
}

export const i18n = createI18n({
  legacy: false,
  locale: readInitial(),
  fallbackLocale: 'fr',
  messages: { fr, en },
})
