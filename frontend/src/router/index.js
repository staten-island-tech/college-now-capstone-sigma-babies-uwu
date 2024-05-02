import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/grind',
      name: 'grind',
      component: () => import('../views/GrindTime.vue')
    },
    {
      path: '/max',
      name: 'max',
      component: () => import('../views/MaxTime.vue')
    },
  ]
})

export default router
