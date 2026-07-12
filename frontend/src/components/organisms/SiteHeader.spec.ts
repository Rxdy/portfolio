import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteHeader from './SiteHeader.vue'
import { makeRouter } from '@/test/router'

describe('SiteHeader', () => {
  it('affiche la marque, les liens GitHub/LinkedIn et la navigation de pages', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(SiteHeader, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('rxdy')

    const github = wrapper.find('.site-header__controls a[href="https://github.com/rxdy"]')
    expect(github.exists()).toBe(true)
    expect(github.attributes('target')).toBe('_blank')

    const linkedin = wrapper.find(
      '.site-header__controls a[href="https://www.linkedin.com/in/rudy-alves-8a41b4184/"]',
    )
    expect(linkedin.exists()).toBe(true)
    expect(linkedin.attributes('target')).toBe('_blank')

    // La navigation ne pointe QUE vers des pages, jamais vers une ancre de section (#...).
    // Accueil est explicite (permet de retirer les liens « retour » de chaque page) ; les
    // autres pages listées SONT SANS point d'entrée ailleurs sur la home (Projets,
    // Collaboration, Contact) — Compétences/Écoles & entreprises/Mon parcours/CV restent
    // accessibles depuis leurs liens dans le contenu de la home.
    const navLinks = wrapper.findAll('.site-header__nav a')
    expect(navLinks).toHaveLength(4)
    for (const link of navLinks) {
      expect(link.attributes('href')).not.toContain('#')
    }
    expect(wrapper.find('.site-header__nav a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/projets"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/contact"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/collaboration"]').exists()).toBe(true)
  })

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
