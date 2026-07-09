import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SchoolsSection from './SchoolsSection.vue'

describe('SchoolsSection', () => {
  it('affiche les écoles', () => {
    const wrapper = mount(SchoolsSection)
    expect(wrapper.text()).toContain('Mes écoles')
    expect(wrapper.text()).toContain('IRUP')
    expect(wrapper.text()).toContain('CNAM')
    expect(wrapper.findAll('.entity-card').length).toBeGreaterThanOrEqual(4)
  })
})
