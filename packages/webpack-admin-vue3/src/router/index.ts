import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/pages/dashboard/index.vue';
import Dashboard from '@/layouts/default.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/pages/login.vue') },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        { path: '/', component: () => import('@/pages/dashboard/index.vue') },
        { path: '/vue', component: () => import('@/pages/vue.vue') },
        { path: '/react', component: () => import('@/pages/react.vue') },
      ],
    },
  ],
});
export default router;
