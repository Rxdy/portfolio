import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EntityCard from './EntityCard.vue'

const base = {
  name: 'Def Systèmes',
  subtitle: 'Alternance · depuis 2024',
  description: 'Mon entreprise d’alternance.',
}

describe('EntityCard', () => {
  it('affiche le nom, le sous-titre et la description', () => {
    const wrapper = mount(EntityCard, { props: base })
    expect(wrapper.text()).toContain('Def Systèmes')
    expect(wrapper.text()).toContain('Alternance · depuis 2024')
    expect(wrapper.text()).toContain('Mon entreprise')
  })

  it("n'affiche pas de lien sans prop link", () => {
    const wrapper = mount(EntityCard, { props: base })
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('génère un monogramme à partir du nom sans logo', () => {
    const wrapper = mount(EntityCard, { props: base })
    expect(wrapper.find('.entity-card__monogram').text()).toBe('DS')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('affiche le logo quand il est fourni', () => {
    const wrapper = mount(EntityCard, { props: { ...base, logo: '/logos/def.svg' } })
    expect(wrapper.find('img').attributes('src')).toBe('/logos/def.svg')
    expect(wrapper.find('.entity-card__monogram').exists()).toBe(false)
  })

  it('affiche le lien externe avec son libellé', () => {
    const wrapper = mount(EntityCard, {
      props: { ...base, link: 'https://def-systemes.fr', linkLabel: 'def-systemes.fr' },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://def-systemes.fr')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.text()).toContain('def-systemes.fr')
  })

  it('utilise le libellé par défaut « Voir le site » sans linkLabel', () => {
    const wrapper = mount(EntityCard, { props: { ...base, link: 'https://x.fr' } })
    expect(wrapper.find('a').text()).toContain('Voir le site')
  })
})
