import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from './ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('bascule le thème et met à jour le libellé au clic', async () => {
    const wrapper = mount(ThemeToggle)
    const btn = wrapper.get('button')
    // Départ en sombre → propose de passer en clair
    expect(btn.attributes('aria-label')).toBe('Passer en mode clair')

    await btn.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(btn.attributes('aria-label')).toBe('Passer en mode sombre')
  })
})
