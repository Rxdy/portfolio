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
