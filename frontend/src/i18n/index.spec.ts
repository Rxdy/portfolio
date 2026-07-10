import { describe, it, expect, beforeEach, vi } from 'vitest'

// readInitial() ne s'exécute qu'une fois, au chargement du module (singleton).
// On isole chaque scénario avec resetModules() + un import dynamique frais.
describe('i18n', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('démarre en français par défaut, sans préférence stockée', async () => {
    const { i18n } = await import('./index')
    expect(i18n.global.locale.value).toBe('fr')
  })

  it('reprend la langue stockée si elle est valide', async () => {
    localStorage.setItem('locale', 'en')
    const { i18n } = await import('./index')
    expect(i18n.global.locale.value).toBe('en')
  })

  it('ignore une valeur stockée invalide et retombe sur le français', async () => {
    localStorage.setItem('locale', 'de')
    const { i18n } = await import('./index')
    expect(i18n.global.locale.value).toBe('fr')
  })
})
