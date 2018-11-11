import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/user'
import Home from '@/pages/home/index'
import Admin from '@/pages/admin/index'
import userManage from '@/pages/admin/user-manage/index'
import Dynamic from '@/pages/dynamic/dynamic'
import AdminLogin from '@/pages/admin-login/index'

import personal from '@/pages/PersonalCenter/PersonalCenter'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/Dynamic',
      name: 'Dynamic',
      component: Dynamic
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    }
  ]
})

const asyncRouterMap = [{
  path: '/admin',
  component: Admin,
  children: [
    {
      path: '/',
      component: userManage
    }
  ]
}]

router.beforeEach((to, from, next) => {
  if (store.getters.isAdmin && !sessionStorage.addFlag) {
    router.addRoutes(asyncRouterMap)
    sessionStorage.addFlag = true
    next({...to, replace: true})
  } else if (store.getters.isAdmin && to.path === '/adminLogin') {
    next('/admin')
  } else {
    next()
  }
})

export default router
