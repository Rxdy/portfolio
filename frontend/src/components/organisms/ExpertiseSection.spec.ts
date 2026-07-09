import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExpertiseSection from './ExpertiseSection.vue'

describe('ExpertiseSection', () => {
  it('affiche les 4 cartes de savoir-faire', () => {
    const wrapper = mount(ExpertiseSection)
    expect(wrapper.text()).toContain('Gestion de projet')
    expect(wrapper.text()).toContain('Sécurité applicative')
    expect(wrapper.text()).toContain('Self-Contained Systems')
    expect(wrapper.findAll('.capability-card')).toHaveLength(4)
  })
})
