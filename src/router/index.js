import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/user'
import Home from '@/pages/home/index'
import Admin from '@/pages/admin/index'
import userDataManage from '@/pages/admin/user-data-manage/index'
import userInfoManage from '@/pages/admin/user-info-manage/index'
import adminManage from '@/pages/admin/admin-manage/index'
import newsManage from '@/pages/admin/news-manage/index'
import Dynamic from '@/pages/dynamic/dynamic'
import AdminLogin from '@/pages/admin-login/index'

import postdynam from '@/pages/dynamic/PostDynamci'
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
    },
    {
      path: '/postdynam',
      name: postdynam,
      component: postdynam
    }
  ]
})

const asyncRouterMap = [{
  path: '/admin',
  component: Admin,
  children: [
    {
      path: '',
      component: userDataManage
    },
    {
      path: 'userInfo',
      component: userInfoManage
    },
    {
      path: 'allAdmins',
      component: adminManage
    },
    {
      path: 'news',
      component: newsManage
    }
  ]
}]

let addFlag = false

router.beforeEach((to, from, next) => {
  if (store.getters.isAdmin && !addFlag) {
    router.addRoutes(asyncRouterMap)
    addFlag = true
    next({...to, replace: true})
  } else if (store.getters.isAdmin && to.path === '/adminLogin') {
    next('/admin')
  } else {
    next()
  }
})

export default router
