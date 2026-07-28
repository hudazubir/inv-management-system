import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ReportsView from '@/views/ReportsView.vue'
import SuppliersView from '@/views/SuppliersView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: ForgotPasswordView,
        },
      ],
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: {
            section: 'Workspace',
            title: 'Inventory Overview',
            requiresAuth: true,
          },
        },
        {
          path: 'products',
          name: 'products',
          component: ProductsView,
          meta: {
            section: 'Inventory',
            title: 'Products',
            requiresAuth: true,
          },
        },
        {
          path: 'categories',
          name: 'categories',
          component: CategoriesView,
          meta: {
            section: 'Inventory',
            title: 'Categories',
            requiresAuth: true,
          },
        },
        {
          path: 'suppliers',
          name: 'suppliers',
          component: SuppliersView,
          meta: {
            section: 'Partners',
            title: 'Suppliers',
            requiresAuth: true,
          },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: TransactionsView,
          meta: {
            section: 'Operations',
            title: 'Stock Movements',
            requiresAuth: true,
          },
        },
        {
          path: 'reports',
          name: 'reports',
          component: ReportsView,
          meta: {
            section: 'Analytics',
            title: 'Reports',
            requiresAuth: true,
          },
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  if (to.meta.requiresAuth && !authStore.user) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.name === 'login' && authStore.user) {
    return {
      name: 'dashboard',
    }
  }

  return true
})

export default router