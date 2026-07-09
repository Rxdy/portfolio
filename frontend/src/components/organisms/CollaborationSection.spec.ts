import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CollaborationSection from './CollaborationSection.vue'

describe('CollaborationSection', () => {
  it('affiche le titre Collaboration et les deux cartes', () => {
    const wrapper = mount(CollaborationSection)
    expect(wrapper.text()).toContain('Collaboration')
    expect(wrapper.text()).toContain('binôme')
    expect(wrapper.findAll('.collab__card')).toHaveLength(2)
  })
})
