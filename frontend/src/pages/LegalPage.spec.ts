import { describe, it, expect } from 'vitest'
import LegalPage from './LegalPage.vue'
import { mountWithRouter } from '@/test/router'

describe('LegalPage', () => {
  it('affiche les mentions légales et la politique de confidentialité', async () => {
    const wrapper = await mountWithRouter(LegalPage)
    expect(wrapper.text()).toContain('Mentions légales')
    expect(wrapper.text()).toContain('Éditeur du site')
    expect(wrapper.text()).toContain('Données personnelles')
    expect(wrapper.text()).toContain('Cookies')
    expect(wrapper.text()).toContain('localStorage')
    expect(wrapper.text()).toContain('Mesure d\'audience')
  })
})
