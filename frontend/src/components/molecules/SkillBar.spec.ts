import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillBar from './SkillBar.vue'
import { mountWithRouter } from '@/test/router'

describe('SkillBar', () => {
  it('affiche le label et le niveau', () => {
    const wrapper = mount(SkillBar, { props: { label: 'Vue.js', level: 'Confirmé' } })
    expect(wrapper.text()).toContain('Vue.js')
    expect(wrapper.text()).toContain('Confirmé')
  })

  it('mappe chaque niveau sur une largeur de barre', () => {
    const levels = ['Notions', 'Intermédiaire', 'Confirmé'] as const
    for (const level of levels) {
      const wrapper = mount(SkillBar, { props: { label: 'X', level } })
      const bar = wrapper.get('[role="progressbar"]')
      expect(Number(bar.attributes('aria-valuenow'))).toBeGreaterThan(0)
      expect(bar.attributes('aria-label')).toContain(level)
    }
  })

  it('affiche un tag cliquable vers les projets où la compétence est appliquée', async () => {
    const wrapper = await mountWithRouter(SkillBar, {
      props: { label: 'JavaScript', level: 'Confirmé', projects: ['Abloue'] },
    })
    const tag = wrapper.get('.skill-bar__tag')
    expect(tag.text()).toContain('Abloue')
    expect(tag.attributes('href')).toBe('/projets')
  })

  it('n’affiche pas de tag sans projet', () => {
    const wrapper = mount(SkillBar, { props: { label: 'Rust', level: 'Notions' } })
    expect(wrapper.find('.skill-bar__tags').exists()).toBe(false)
  })
})
