import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTag from './BaseTag.vue'

describe('BaseTag', () => {
  it('affiche le libellé', () => {
    const wrapper = mount(BaseTag, { props: { label: 'Vue.js' } })
    expect(wrapper.text()).toBe('Vue.js')
    expect(wrapper.classes()).toContain('base-tag')
  })
})
