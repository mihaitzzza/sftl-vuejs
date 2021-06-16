import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-list',
    name: 'NewList',
    /*
    * route level code-splitting this generates a separate chunk (about.[hash].js) for this route
    * which is lazy-loaded when the route is visited.
    * */
    component: () => import('../views/NewList.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    /*
    * route level code-splitting this generates a separate chunk (about.[hash].js) for this route
    * which is lazy-loaded when the route is visited.
    * */
    component: () => import('../views/Settings.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
