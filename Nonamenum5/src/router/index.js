import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast'
import { check, isLogin } from '../utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Login.vue')
      },
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Register.vue')
      }
    ]
  },
  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout.vue'),
    children: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', title: '仪表盘' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            meta: { title: '综合分析' },
            name: 'analysis',
            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Analysis.vue')
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        component: { render: h => h('router-view') },
        meta: { icon: 'form', title: '表格管理', authority: ['admin'] },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            meta: { title: '基础表单' },
            component: () => import(/* webpackChunkName: "form" */ '../views/Forms/BasicForm.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ '../views/403.vue')
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
