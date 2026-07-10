import { describe, it, expect, vi } from 'vitest'
import CVPage from './CVPage.vue'
import { mountWithRouter } from '@/test/router'

// Tous les diplômes réels ont un `detail` : on en ajoute un sans, pour exercer
// la branche d'affichage conditionnel sans modifier les vraies données.
vi.mock('@/data/education', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/education')>()
  return {
    ...actual,
    diplomas: [...actual.diplomas, { title: 'Formation continue', place: 'Autoformation', period: '2020' }],
  }
})

describe('CVPage', () => {
  it('assemble le CV à partir des données du site', async () => {
    const wrapper = await mountWithRouter(CVPage)
    expect(wrapper.text()).toContain('Rudy Alves')
    expect(wrapper.text()).toContain('Expérience professionnelle')
    expect(wrapper.text()).toContain('Formation')
    expect(wrapper.text()).toContain('Projets')
    expect(wrapper.text()).toContain('Abloue')
    expect(wrapper.text()).toContain('Savoir-faire')
    expect(wrapper.text()).toContain('Compétences')
    // contenu tiré des modules partagés
    expect(wrapper.text()).toContain('Def Systèmes — Saint-Étienne')
    expect(wrapper.text()).toContain('Master — Gestion de projet informatique')
    expect(wrapper.find('.cv__download').exists()).toBe(true)
  })

  it('déclenche l’impression du navigateur au clic sur « Télécharger en PDF »', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    const wrapper = await mountWithRouter(CVPage)
    await wrapper.get('.cv__download').trigger('click')
    expect(printSpy).toHaveBeenCalledOnce()
    printSpy.mockRestore()
  })

  it('n’affiche pas de détail quand un diplôme n’en a pas', async () => {
    const wrapper = await mountWithRouter(CVPage)
    const entries = wrapper.findAll('.cv__entry')
    const descriptions = wrapper.findAll('.cv__entry-desc')
    expect(descriptions.length).toBeLessThan(entries.length)
  })
})
