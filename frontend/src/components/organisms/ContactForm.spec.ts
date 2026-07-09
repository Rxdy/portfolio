import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactForm from './ContactForm.vue'

function fill(wrapper: ReturnType<typeof mount>, over: Partial<Record<string, string>> = {}) {
  const values = {
    '#cf-name': over.name ?? 'Rudy',
    '#cf-email': over.email ?? 'rudy@example.com',
    '#cf-message': over.message ?? 'Bonjour, message de test suffisamment long.',
  }
  return Promise.all(
    Object.entries(values).map(([sel, val]) => wrapper.get(sel).setValue(val)),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  it('désactive le bouton tant que le formulaire est invalide', async () => {
    const wrapper = mount(ContactForm)
    const btn = () => wrapper.get('button[type="submit"]')
    expect(btn().attributes('disabled')).toBeDefined()

    // email invalide → toujours désactivé
    await fill(wrapper, { email: 'pas-un-email' })
    expect(btn().attributes('disabled')).toBeDefined()

    // message trop court → toujours désactivé
    await fill(wrapper, { message: 'court' })
    expect(btn().attributes('disabled')).toBeDefined()

    // tout valide → activé
    await fill(wrapper)
    expect(btn().attributes('disabled')).toBeUndefined()
  })

  it('envoie et affiche un succès', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const wrapper = mount(ContactForm)
    await fill(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
    expect(wrapper.find('.contact-form__msg--ok').exists()).toBe(true)
  })

  it('affiche une erreur si la réponse est en échec', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const wrapper = mount(ContactForm)
    await fill(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact-form__msg--ko').exists()).toBe(true)
  })

  it('affiche une erreur si le réseau échoue', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')))
    const wrapper = mount(ContactForm)
    await fill(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact-form__msg--ko').exists()).toBe(true)
  })

  it('ne fait rien si on soumet un formulaire vide', async () => {
    const spy = vi.fn()
    vi.stubGlobal('fetch', spy)
    const wrapper = mount(ContactForm)
    await wrapper.get('form').trigger('submit')
    expect(spy).not.toHaveBeenCalled()
  })
})
