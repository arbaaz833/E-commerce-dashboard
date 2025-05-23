import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const sidebarRoutes: RouteRecordRaw[] = [
  {
    name: 'revenue',
    path: '/revenue',
    component: () => import('../views/Revenue.vue'),
    meta: {
      layout: 'dashboardLayout',
      icon: 'pi pi-chart-line',
      label: 'Revenue',
    },
  },
  {
    name: 'inventory',
    path: '/inventory',
    component: () => import('../views/Inventory.vue'),
    meta: {
      layout: 'dashboardLayout',
      icon: 'pi pi-list-check',
      label: 'Inventory',
    },
  },
  {
    name: 'product',
    path: '/product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'dashboardLayout',
      icon: 'pi pi-warehouse',
      label: 'Product',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [],
    },
    ...sidebarRoutes,
  ],
})

export default router
