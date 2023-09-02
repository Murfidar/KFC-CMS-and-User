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
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarkView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.name === 'bookmarks' && !localStorage.access_token) {
    return false
  } else if ((to.name === 'login' || to.name === 'register') && localStorage.access_token) {
    return false
  } 
})

export default router
