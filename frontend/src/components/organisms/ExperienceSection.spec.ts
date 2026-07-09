import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceSection from './ExperienceSection.vue'

describe('ExperienceSection', () => {
  it('affiche les expériences (Def Systèmes, CAVEM)', () => {
    const wrapper = mount(ExperienceSection)
    expect(wrapper.text()).toContain('Expérience')
    expect(wrapper.text()).toContain('Def Systèmes')
    expect(wrapper.text()).toContain('CAVEM')
  })
})
