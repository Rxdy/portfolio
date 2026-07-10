import { describe, it, expect } from 'vitest'
import HomePage from './HomePage.vue'
import { mountWithRouter } from '@/test/router'

describe('HomePage', () => {
  it('assemble les sections principales', async () => {
    const wrapper = await mountWithRouter(HomePage)
    expect(wrapper.text()).toContain('À propos')
    expect(wrapper.text()).toContain('Expérience')
    expect(wrapper.text()).toContain('Mon savoir-faire')
  })

  it('ne montre plus Projets, Collaboration ni Contact en ligne (déplacés en pages)', async () => {
    const wrapper = await mountWithRouter(HomePage)
    expect(wrapper.text()).not.toContain('Mes projets')
    expect(wrapper.find('#collaboration').exists()).toBe(false)
    expect(wrapper.find('#contact').exists()).toBe(false)
  })
})
