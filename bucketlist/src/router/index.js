import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'About',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/chats',
    name: 'chats',
    component: () => import('../views/Chats.vue'),
  },
  {
    path: '/chats/:id',
    name: 'DetailChat',
    component: () => import('../views/ChatDetail.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
