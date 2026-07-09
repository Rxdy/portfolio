import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteHeader from './SiteHeader.vue'
import { makeRouter } from '@/test/router'

describe('SiteHeader', () => {
  it('ouvre et ferme le menu via le burger', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(SiteHeader, { global: { plugins: [router] } })

    expect(wrapper.find('.site-header.is-open').exists()).toBe(false)
    await wrapper.get('.site-header__burger').trigger('click')
    expect(wrapper.find('.site-header.is-open').exists()).toBe(true)
    await wrapper.get('.site-header__burger').trigger('click')
    expect(wrapper.find('.site-header.is-open').exists()).toBe(false)
  })

  it('referme le menu lors d’une navigation', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(SiteHeader, { global: { plugins: [router] } })

    await wrapper.get('.site-header__burger').trigger('click')
    expect(wrapper.find('.site-header.is-open').exists()).toBe(true)

    await router.push({ name: 'skills' })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.site-header.is-open').exists()).toBe(false)
  })

  it('referme le menu au clic sur un lien de navigation', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(SiteHeader, { global: { plugins: [router] } })

    await wrapper.get('.site-header__burger').trigger('click')
    expect(wrapper.find('.site-header.is-open').exists()).toBe(true)

    await wrapper.get('.site-header__nav .nav-link').trigger('click')
    expect(wrapper.find('.site-header.is-open').exists()).toBe(false)
  })
})
