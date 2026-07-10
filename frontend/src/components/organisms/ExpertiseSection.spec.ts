import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExpertiseSection from './ExpertiseSection.vue'

describe('ExpertiseSection', () => {
  it('affiche les 4 savoir-faire en résumé, sans détail ni lien de page dédiée', () => {
    const wrapper = mount(ExpertiseSection)
    expect(wrapper.text()).toContain('Gestion de projet')
    expect(wrapper.text()).toContain('Sécurité applicative')
    expect(wrapper.findAll('.capability-brief')).toHaveLength(4)
    // Le détail (puces) faisait trop chargé : la page dédiée a été supprimée
    expect(wrapper.text()).not.toContain('Self-Contained Systems')
    expect(wrapper.find('a[href="/savoir-faire"]').exists()).toBe(false)
  })
})
