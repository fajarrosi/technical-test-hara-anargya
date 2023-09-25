import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect:{name:'Dashboard'},
      component: () => import('../layouts/MainLayout.vue'),
      children:[
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../pages/DashboardPage.vue')
        },
        {
          path: 'overview',
          name: 'Overview',
          component: () => import('../pages/OverviewPage.vue')
        }
      ]
    },
  ]
})

export default router
