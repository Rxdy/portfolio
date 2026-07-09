import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('rend un <button> par défaut', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Envoyer' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Envoyer')
  })

  it('rend un <a> quand href est fourni', () => {
    const wrapper = mount(BaseButton, { props: { href: 'mailto:test@x.fr' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('mailto:test@x.fr')
  })

  it('applique la classe de la variante', () => {
    const wrapper = mount(BaseButton, { props: { variant: 'secondary' } })
    expect(wrapper.classes()).toContain('base-button--secondary')
  })

  it('utilise la variante primary par défaut', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.classes()).toContain('base-button--primary')
  })
})
