import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TimelineItem from './TimelineItem.vue'

const base = { title: 'Master', place: 'IRUP', period: '2025 — 2027' }

describe('TimelineItem', () => {
  it('affiche titre, lieu et période', () => {
    const wrapper = mount(TimelineItem, { props: base })
    expect(wrapper.text()).toContain('Master')
    expect(wrapper.text()).toContain('IRUP')
    expect(wrapper.text()).toContain('2025 — 2027')
  })

  it("n'affiche pas de description quand elle est absente", () => {
    const wrapper = mount(TimelineItem, { props: base })
    expect(wrapper.find('.timeline-item__description').exists()).toBe(false)
  })

  it('affiche la description quand elle est fournie', () => {
    const wrapper = mount(TimelineItem, {
      props: { ...base, description: 'En alternance' },
    })
    expect(wrapper.find('.timeline-item__description').text()).toBe('En alternance')
  })
})
