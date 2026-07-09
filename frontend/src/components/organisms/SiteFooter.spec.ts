import { describe, it, expect } from 'vitest'
import SiteFooter from './SiteFooter.vue'
import { mountWithRouter } from '@/test/router'

describe('SiteFooter', () => {
  it('affiche la marque, la navigation et les contacts', async () => {
    const wrapper = await mountWithRouter(SiteFooter)
    expect(wrapper.text()).toContain('rxdy')
    expect(wrapper.text()).toContain('Rudy Alves')
    expect(wrapper.find('a[href="https://github.com/rxdy"]').exists()).toBe(true)
    // liens de navigation présents
    expect(wrapper.findAll('.site-footer__link').length).toBeGreaterThanOrEqual(8)
    // année courante dans le copyright
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })
})
