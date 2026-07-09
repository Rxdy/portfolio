import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavLink from './NavLink.vue'
import { makeRouter } from '@/test/router'

describe('NavLink', () => {
  it('rend un lien vers la destination avec le contenu du slot', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(NavLink, {
      props: { to: { name: 'skills' } },
      slots: { default: 'Compétences' },
      global: { plugins: [router] },
    })
    const a = wrapper.get('a')
    expect(a.text()).toBe('Compétences')
    expect(a.attributes('href')).toBe('/competences')
    expect(a.classes()).toContain('nav-link')
  })
})
