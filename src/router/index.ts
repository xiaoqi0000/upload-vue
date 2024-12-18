import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/upload',
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/upload.vue'),
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/views/download.vue'),
    },
  ],
})
export default router
