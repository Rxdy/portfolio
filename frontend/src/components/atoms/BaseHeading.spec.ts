import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseHeading from './BaseHeading.vue'

describe('BaseHeading', () => {
  it('rend un <h2> par défaut', () => {
    const wrapper = mount(BaseHeading, { slots: { default: 'Titre' } })
    expect(wrapper.element.tagName).toBe('H2')
    expect(wrapper.text()).toBe('Titre')
  })

  it('rend le niveau demandé', () => {
    const wrapper = mount(BaseHeading, { props: { level: 1 } })
    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.classes()).toContain('base-heading--h1')
  })
})
