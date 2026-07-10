import { ref } from 'vue'
import { i18n, type Locale } from '@/i18n'

// État partagé entre tous les composants (déclaré au niveau du module)
const locale = ref<Locale>(i18n.global.locale.value as Locale)

function apply(next: Locale) {
  locale.value = next
  i18n.global.locale.value = next
  document.documentElement.lang = next
  localStorage.setItem('locale', next)
}

// Applique la langue initiale sur <html lang> dès le chargement du module.
apply(locale.value)

export function useLocale() {
  function toggle() {
    apply(locale.value === 'fr' ? 'en' : 'fr')
  }

  return { locale, toggle }
}
