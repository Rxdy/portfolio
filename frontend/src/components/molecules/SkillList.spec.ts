import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillList from './SkillList.vue'

describe('SkillList', () => {
  it('rend un tag par compétence', () => {
    const skills = ['Vue.js', 'TypeScript', 'Docker']
    const wrapper = mount(SkillList, { props: { skills } })
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
    expect(wrapper.text()).toContain('Vue.js')
    expect(wrapper.text()).toContain('Docker')
  })
})
