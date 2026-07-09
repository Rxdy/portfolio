import { describe, it, expect } from 'vitest'
import JourneyTeaser from './JourneyTeaser.vue'
import { mountWithRouter } from '@/test/router'

describe('JourneyTeaser', () => {
  it('renvoie vers la page Mon parcours', async () => {
    const wrapper = await mountWithRouter(JourneyTeaser)
    expect(wrapper.text()).toContain('En savoir plus')
    const link = wrapper.get('a.journey-teaser')
    expect(link.attributes('href')).toBe('/mon-parcours')
  })
})
