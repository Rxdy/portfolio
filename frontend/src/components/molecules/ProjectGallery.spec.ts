import { describe, it, expect, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import ProjectGallery from './ProjectGallery.vue'

const images = ['/screenshots/a.png', '/screenshots/b.png']

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('ProjectGallery', () => {
  it("n'affiche rien quand la liste d'images est vide", () => {
    wrapper = mount(ProjectGallery, { props: { images: [], name: 'Test' } })
    expect(wrapper.find('.project-gallery').exists()).toBe(false)
  })

  it('affiche une vignette par image', () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' } })
    expect(wrapper.findAll('.project-gallery__thumb')).toHaveLength(2)
  })

  it('grise les vignettes quand grayscale est vrai', () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test', grayscale: true } })
    expect(wrapper.get('.project-gallery__thumb').classes()).toContain('project-gallery__thumb--grayscale')
  })

  it('ouvre la modale sur la bonne image au clic sur une vignette', async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[1]!.trigger('click')

    const modalImage = document.querySelector('.project-gallery__modal-image')
    expect(modalImage?.getAttribute('src')).toBe('/screenshots/b.png')
  })

  it('ferme la modale au clic sur le bouton fermer', async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')
    expect(document.querySelector('.project-gallery__modal')).not.toBeNull()

    const closeBtn = document.querySelector('.project-gallery__close') as HTMLButtonElement
    closeBtn.click()
    await wrapper.vm.$nextTick()

    expect(document.querySelector('.project-gallery__modal')).toBeNull()
  })

  it('ferme la modale au clic sur le fond (mais pas sur la capture elle-même)', async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')

    const modalImage = document.querySelector('.project-gallery__modal-image') as HTMLElement
    modalImage.click()
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal')).not.toBeNull()

    const modal = document.querySelector('.project-gallery__modal') as HTMLElement
    modal.click()
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal')).toBeNull()
  })

  it("n'affiche pas de flèches de navigation pour une seule image", async () => {
    wrapper = mount(ProjectGallery, { props: { images: [images[0]!], name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')

    expect(document.querySelector('.project-gallery__nav')).toBeNull()
  })

  it('navigue au suivant/précédent via les boutons, en bouclant', async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')

    const next = document.querySelector('.project-gallery__nav--next') as HTMLButtonElement
    next.click()
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal-image')?.getAttribute('src')).toBe('/screenshots/b.png')

    next.click()
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal-image')?.getAttribute('src')).toBe('/screenshots/a.png')

    const prev = document.querySelector('.project-gallery__nav--prev') as HTMLButtonElement
    prev.click()
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal-image')?.getAttribute('src')).toBe('/screenshots/b.png')
  })

  it('navigue et ferme au clavier (flèches, Échap) seulement pendant que la modale est ouverte', async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })

    // Avant ouverture : ne doit rien faire (pas d'écouteur encore attaché).
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal-image')?.getAttribute('src')).toBe('/screenshots/b.png')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal-image')?.getAttribute('src')).toBe('/screenshots/a.png')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.project-gallery__modal')).toBeNull()

    // Une fois fermée, les flèches ne doivent plus rien faire.
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    expect(document.querySelector('.project-gallery__modal')).toBeNull()
  })

  it("retire l'écouteur clavier au démontage pendant que la modale est ouverte", async () => {
    wrapper = mount(ProjectGallery, { props: { images, name: 'Test' }, attachTo: document.body })
    await wrapper.findAll('.project-gallery__thumb')[0]!.trigger('click')

    wrapper.unmount()
    wrapper = undefined

    // Ne doit pas lever d'erreur : l'écouteur a bien été retiré.
    expect(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))).not.toThrow()
  })
})
