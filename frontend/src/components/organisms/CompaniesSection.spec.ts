import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CompaniesSection from './CompaniesSection.vue'

describe('CompaniesSection', () => {
  it('affiche les entreprises et le lien Def Systèmes', () => {
    const wrapper = mount(CompaniesSection)
    expect(wrapper.text()).toContain('Mes entreprises')
    expect(wrapper.text()).toContain('Def Systèmes')
    expect(wrapper.text()).toContain('CAVEM')
    const link = wrapper.get('a.entity-card__link')
    expect(link.attributes('href')).toBe('https://def-systemes.fr')
  })
})
