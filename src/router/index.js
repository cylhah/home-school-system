import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/user'
import Home from '@/pages/home/index'
import Admin from '@/pages/admin/index'
import Dynamic from '@/pages/dynamic/dynamic'
import AdminLogin from '@/pages/admin-login/index'

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
    }
  ]
})

const asyncRouterMap = [{
  path: '/admin',
  name: 'admin',
  component: Admin
}]

router.beforeEach((to, from, next) => {
  if (store.getters.isAdmin && !sessionStorage.addFlag) {
    router.addRoutes(asyncRouterMap)
    sessionStorage.addFlag = true
    next({...to, replace: true})
  } else {
    next()
  }
})

export default router
