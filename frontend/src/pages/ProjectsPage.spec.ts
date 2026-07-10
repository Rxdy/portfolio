import { describe, it, expect } from 'vitest'
import ProjectsPage from './ProjectsPage.vue'
import { mountWithRouter } from '@/test/router'

describe('ProjectsPage', () => {
  it('liste les projets et pointe vers l’organisation Abend-core', async () => {
    const wrapper = await mountWithRouter(ProjectsPage)
    expect(wrapper.text()).toContain('Mes projets')
    expect(wrapper.text()).toContain('Abloue')
    expect(wrapper.findAll('.project-card').length).toBeGreaterThanOrEqual(1)
    expect(wrapper.find('a[href="https://github.com/Abend-core"]').exists()).toBe(true)
  })
})
