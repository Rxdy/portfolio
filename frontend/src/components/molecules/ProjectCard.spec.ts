import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from './ProjectCard.vue'
import ProjectGallery from './ProjectGallery.vue'
import type { Project } from '@/data/projects'

const full: Project = {
  name: 'Abloue',
  tagline: 'Carte interactive',
  description: 'Une appli de visualisation.',
  stack: ['HTML', 'jQuery'],
  online: false,
  repo: 'https://github.com/Abend-core/Abloue',
  demo: 'https://abloue.example',
}

describe('ProjectCard', () => {
  it('affiche le nom, le statut, la stack et les liens', () => {
    const wrapper = mount(ProjectCard, { props: { project: full } })
    expect(wrapper.text()).toContain('Abloue')
    expect(wrapper.text()).toContain('Hors ligne')
    expect(wrapper.text()).toContain('Carte interactive')
    expect(wrapper.findAll('.project-card__stack li')).toHaveLength(2)
    expect(wrapper.find('a[href="https://github.com/Abend-core/Abloue"]').exists()).toBe(true)
    expect(wrapper.find('a[href="https://abloue.example"]').exists()).toBe(true)
  })

  it('affiche "En ligne" quand le projet est en ligne', () => {
    const wrapper = mount(ProjectCard, { props: { project: { ...full, online: true } } })
    expect(wrapper.text()).toContain('En ligne')
    expect(wrapper.find('.project-card__status--online').exists()).toBe(true)
  })

  it('omet les liens quand ils sont absents', () => {
    const minimal: Project = {
      name: 'Sans liens',
      tagline: 'Tagline',
      description: 'Desc',
      stack: ['CSS'],
      online: false,
    }
    const wrapper = mount(ProjectCard, { props: { project: minimal } })
    expect(wrapper.find('.project-card__status--offline').exists()).toBe(true)
    expect(wrapper.findAll('.project-card__link')).toHaveLength(0)
    expect(wrapper.find('.project-card__links').exists()).toBe(false)
  })

  it('affiche le conteneur de liens avec seulement un repo (sans démo)', () => {
    const repoOnly: Project = {
      name: 'Repo seul',
      tagline: 'Tagline',
      description: 'Desc',
      stack: ['CSS'],
      online: false,
      repo: 'https://github.com/rxdy/repo-only',
    }
    const wrapper = mount(ProjectCard, { props: { project: repoOnly } })
    expect(wrapper.find('.project-card__links').exists()).toBe(true)
    expect(wrapper.find('a[href="https://github.com/rxdy/repo-only"]').exists()).toBe(true)
  })

  it('affiche le conteneur de liens avec seulement une démo (sans repo)', () => {
    const demoOnly: Project = {
      name: 'Démo seule',
      tagline: 'Tagline',
      description: 'Desc',
      stack: ['CSS'],
      online: true,
      demo: 'https://demo.example',
    }
    const wrapper = mount(ProjectCard, { props: { project: demoOnly } })
    expect(wrapper.find('.project-card__links').exists()).toBe(true)
    expect(wrapper.find('a[href="https://demo.example"]').exists()).toBe(true)
  })

  it('affiche la galerie quand des captures sont définies', () => {
    const withScreenshots: Project = { ...full, screenshots: ['/screenshots/abloue.png'] }
    const wrapper = mount(ProjectCard, { props: { project: withScreenshots } })
    expect(wrapper.findComponent(ProjectGallery).exists()).toBe(true)
  })

  it("n'affiche pas de galerie sans captures", () => {
    const wrapper = mount(ProjectCard, { props: { project: full } })
    expect(wrapper.findComponent(ProjectGallery).exists()).toBe(false)
  })
})
