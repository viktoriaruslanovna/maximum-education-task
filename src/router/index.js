import { createRouter, createWebHistory } from 'vue-router';
import ApplicationForm from '@/views/ApplicationForm.vue';
import ApplicationComplete from '@/views/ApplicationComplete.vue';
import { completeStorage } from '../storage/completeStorage.js';

const routes = [
  { path: '/:catchAll(.*)', redirect: '/' },
  { path: '/', component: ApplicationForm },
  {
    path: '/complete',
    component: ApplicationComplete,
    beforeEnter: (to, from, next) => {
      if (completeStorage.get()) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
