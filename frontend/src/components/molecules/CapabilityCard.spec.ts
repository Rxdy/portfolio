import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RiTeamLine } from '@remixicon/vue'
import CapabilityCard from './CapabilityCard.vue'

describe('CapabilityCard', () => {
  it('affiche le titre et tous les éléments', () => {
    const wrapper = mount(CapabilityCard, {
      props: {
        icon: RiTeamLine,
        title: 'Gestion de projet',
        items: ['Planification', 'Conduite du changement'],
      },
    })
    expect(wrapper.text()).toContain('Gestion de projet')
    const items = wrapper.findAll('.capability-card__list li')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toBe('Planification')
    expect(items[1].text()).toBe('Conduite du changement')
  })
})
