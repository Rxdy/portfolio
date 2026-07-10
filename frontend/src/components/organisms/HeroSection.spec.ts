import { describe, it, expect } from 'vitest'
import HeroSection from './HeroSection.vue'
import { mountWithRouter } from '@/test/router'

describe('HeroSection', () => {
  it('affiche le nom, les CTA et le lien vers le CV', async () => {
    const wrapper = await mountWithRouter(HeroSection)
    expect(wrapper.text()).toContain('Rudy Alves')
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
    expect(wrapper.find('a[href="/cv"]').exists()).toBe(true)
  })
})
