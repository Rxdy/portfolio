import { describe, it, expect } from 'vitest'
import ContactPage from './ContactPage.vue'
import { mountWithRouter } from '@/test/router'

describe('ContactPage', () => {
  it('affiche uniquement le formulaire de contact', async () => {
    const wrapper = await mountWithRouter(ContactPage)
    expect(wrapper.text()).toContain('Contact')
    expect(wrapper.find('form.contact-form').exists()).toBe(true)
  })

  it("n'expose ni email ni téléphone en clair", async () => {
    const wrapper = await mountWithRouter(ContactPage)
    expect(wrapper.text()).not.toContain('rudyalvs@gmail.com')
    // Pattern plutôt qu'un numéro en dur : évite de committer le vrai numéro
    // dans le code source tout en détectant n'importe quel numéro FR affiché.
    expect(wrapper.text()).not.toMatch(/0\d(\s?\d{2}){4}/)
  })
})
