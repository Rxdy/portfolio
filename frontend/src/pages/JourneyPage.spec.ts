import { describe, it, expect } from 'vitest'
import JourneyPage from './JourneyPage.vue'
import { mountWithRouter } from '@/test/router'

describe('JourneyPage', () => {
  it('raconte le parcours McDonald’s et le tournant', async () => {
    const wrapper = await mountWithRouter(JourneyPage)
    expect(wrapper.text()).toContain('Mon parcours')
    expect(wrapper.text()).toContain("McDonald's")
    expect(wrapper.text()).toContain('gestion de projet')
  })
})
