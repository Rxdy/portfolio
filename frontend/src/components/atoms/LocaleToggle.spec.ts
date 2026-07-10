import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LocaleToggle from './LocaleToggle.vue'

describe('LocaleToggle', () => {
  it('bascule entre FR et EN, et met à jour <html lang>', async () => {
    const wrapper = mount(LocaleToggle)
    const btn = wrapper.get('button')

    // Départ en français
    expect(wrapper.text()).toContain('FR')
    expect(document.documentElement.lang).toBe('fr')

    await btn.trigger('click')
    expect(wrapper.text()).toContain('EN')
    expect(document.documentElement.lang).toBe('en')

    // On revient à l'état initial pour ne pas polluer les autres tests
    await btn.trigger('click')
    expect(wrapper.text()).toContain('FR')
    expect(document.documentElement.lang).toBe('fr')
  })
})
