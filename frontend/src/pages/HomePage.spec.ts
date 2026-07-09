import { describe, it, expect } from 'vitest'
import HomePage from './HomePage.vue'
import { mountWithRouter } from '@/test/router'

describe('HomePage', () => {
  it('assemble les sections principales', async () => {
    const wrapper = await mountWithRouter(HomePage)
    expect(wrapper.text()).toContain('À propos')
    expect(wrapper.text()).toContain('Expérience')
    expect(wrapper.text()).toContain('Mon savoir-faire')
    expect(wrapper.text()).toContain('Collaboration')
    expect(wrapper.text()).toContain('Contact')
  })
})
