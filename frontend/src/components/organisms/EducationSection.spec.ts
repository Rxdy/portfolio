import { describe, it, expect } from 'vitest'
import EducationSection from './EducationSection.vue'
import { mountWithRouter } from '@/test/router'

describe('EducationSection', () => {
  it('affiche les diplômes et le lien vers écoles & entreprises', async () => {
    const wrapper = await mountWithRouter(EducationSection)
    expect(wrapper.text()).toContain('Parcours')
    expect(wrapper.text()).toContain('Master')
    const link = wrapper.get('.education__link')
    expect(link.attributes('href')).toBe('/ecoles-entreprises')
  })
})
