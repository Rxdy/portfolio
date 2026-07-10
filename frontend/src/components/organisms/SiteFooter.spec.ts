import { describe, it, expect, vi } from 'vitest'
import SiteFooter from './SiteFooter.vue'
import { mountWithRouter } from '@/test/router'

describe('SiteFooter', () => {
  it('affiche la marque, les coordonnées, le légal et le crédit stack — sans navigation de pages', async () => {
    const wrapper = await mountWithRouter(SiteFooter)
    expect(wrapper.text()).toContain('rxdy')
    // GitHub est désormais dans l'en-tête, plus dans le pied de page
    expect(wrapper.find('a[href="https://github.com/rxdy"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Saint-Just Saint-Rambert')
    // La navigation de pages du header n'est pas dupliquée ici
    expect(wrapper.find('nav').exists()).toBe(false)

    // Coordonnées : contact + CV
    expect(wrapper.find('a[href="/contact"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/cv"]').exists()).toBe(true)

    // Légal
    expect(wrapper.find('a[href="/mentions-legales"]').exists()).toBe(true)

    // Stack & crédits
    expect(wrapper.text()).toContain('Vue 3')

    // année courante dans le copyright
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })

  it('remonte en haut de page au clic sur « Haut de page »', async () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const wrapper = await mountWithRouter(SiteFooter)
    await wrapper.get('.site-footer__top').trigger('click')
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    scrollSpy.mockRestore()
  })
})
