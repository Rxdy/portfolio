import { describe, it, expect } from 'vitest'
import AboutSection from './AboutSection.vue'
import { mountWithRouter } from '@/test/router'

describe('AboutSection', () => {
  it('affiche le titre, les technos et le lien compétences', async () => {
    const wrapper = await mountWithRouter(AboutSection)
    expect(wrapper.text()).toContain('À propos')
    expect(wrapper.text()).toContain('Vue.js')
    const link = wrapper.get('.about__link')
    expect(link.attributes('href')).toBe('/competences')
  })
})
