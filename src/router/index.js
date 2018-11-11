import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import Dynamic from '@/pages/dynamic/dynamic'
import index2 from '@/pages/lyx/index2'
import tabbar from '@/components/public/tabbar/tabbar'
import header from '@/components/public/header/header-share'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Dynamic',
      name: 'Dynamic',
      component: Dynamic
    },
    {
      path: '/index2',
      name: 'index2',
      component: index2
    },
    {
      path: '/tabbar',
      name: 'tabbar',
      component: tabbar
    },
    {path: '/header', component: header}
  ],
  linkActiveClass: 'mui-active'
})
