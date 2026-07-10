import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
// Routes du portfolio : accueil + page « Mon parcours »

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/competences',
    name: 'skills',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/SkillsPage.vue'),
  },
  {
    path: '/ecoles-entreprises',
    name: 'education-detail',
    component: () => import('@/pages/EducationDetailPage.vue'),
  },
  {
    path: '/mon-parcours',
    name: 'journey',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/JourneyPage.vue'),
  },
  {
    path: '/cv',
    name: 'cv',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/CVPage.vue'),
  },
  {
    path: '/projets',
    name: 'projects',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/ProjectsPage.vue'),
  },
  {
    path: '/collaboration',
    name: 'collaboration',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/CollaborationPage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/mentions-legales',
    name: 'legal',
    // Chargé à la demande (code-splitting)
    component: () => import('@/pages/LegalPage.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    // Si un ancrage est présent, on y défile en douceur
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 72 }
    }
    return { top: 0 }
  },
})
