import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from './HeroSection.vue'

describe('HeroSection', () => {
  it('affiche le nom et les CTA', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Rudy Alves')
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
