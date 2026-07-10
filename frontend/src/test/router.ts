import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import { mount } from '@vue/test-utils'
import { defineComponent, h, type Component } from 'vue'

const Blank = defineComponent({ name: 'Blank', render: () => h('div') })

// Router minimal en mémoire pour les tests : mêmes noms de routes que l'app,
// pour que les <RouterLink :to="{ name: ... }"> se résolvent.
export function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Blank },
      { path: '/competences', name: 'skills', component: Blank },
      { path: '/ecoles-entreprises', name: 'education-detail', component: Blank },
      { path: '/mon-parcours', name: 'journey', component: Blank },
      { path: '/cv', name: 'cv', component: Blank },
      { path: '/projets', name: 'projects', component: Blank },
      { path: '/collaboration', name: 'collaboration', component: Blank },
      { path: '/contact', name: 'contact', component: Blank },
      { path: '/mentions-legales', name: 'legal', component: Blank },
    ],
  })
}

// Monte un composant avec un router de test prêt à l'emploi.
export async function mountWithRouter(
  component: Component,
  options: Record<string, unknown> = {},
) {
  const router = makeRouter()
  // Navigation initiale indispensable avec l'historique mémoire
  await router.push('/')
  await router.isReady()
  return mount(component, { ...options, global: { plugins: [router] } })
}
