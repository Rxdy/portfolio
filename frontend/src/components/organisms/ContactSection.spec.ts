import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from './ContactSection.vue'

describe('ContactSection', () => {
  it('affiche le formulaire et les infos non sensibles', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Contact')
    expect(wrapper.text()).toContain('Permis B')
    expect(wrapper.find('form.contact-form').exists()).toBe(true)
    expect(wrapper.find('a[href="https://github.com/rxdy"]').exists()).toBe(true)
  })

  it("n'expose ni email ni téléphone en clair", () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).not.toContain('rudyalvs@gmail.com')
    expect(wrapper.text()).not.toContain('06 52 68 60 13')
  })
})
