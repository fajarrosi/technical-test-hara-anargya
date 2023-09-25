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
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../pages/OverviewPage.vue')
        }
      ]
    },
  ]
})

export default router
