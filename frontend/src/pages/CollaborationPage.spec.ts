import { describe, it, expect } from 'vitest'
import CollaborationPage from './CollaborationPage.vue'
import { mountWithRouter } from '@/test/router'

describe('CollaborationPage', () => {
  it('affiche le titre, la carte Abend-core et les deux cartes collaboration', async () => {
    const wrapper = await mountWithRouter(CollaborationPage)
    expect(wrapper.text()).toContain('Collaboration')
    expect(wrapper.text()).toContain('binôme')
    expect(wrapper.text()).toContain('Abend-core')
    expect(wrapper.findAll('.collab__card')).toHaveLength(3)
    expect(wrapper.find('a[href="https://github.com/Abend-core"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://github.com/hugolagouardat"]').exists()).toBe(true)
    expect(wrapper.find('img[src="/logos/abend-core.png"]').exists()).toBe(true)
    expect(wrapper.find('img[src="/people/hugo.png"]').exists()).toBe(true)
  })
})
