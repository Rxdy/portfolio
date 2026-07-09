import { describe, it, expect } from 'vitest'
import SkillsPage from './SkillsPage.vue'
import { mountWithRouter } from '@/test/router'

describe('SkillsPage', () => {
  it('affiche les groupes de compétences et des barres', async () => {
    const wrapper = await mountWithRouter(SkillsPage)
    expect(wrapper.text()).toContain('Mes compétences')
    expect(wrapper.text()).toContain('Langages')
    expect(wrapper.text()).toContain('Sequelize')
    expect(wrapper.findAll('.skill-bar').length).toBeGreaterThan(10)
  })
})
