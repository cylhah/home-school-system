import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import Dynamic from '@/pages/dynamic/dynamic'
import index2 from '@/pages/lyx/index2'
import dongtai from '@/pages/lyx/dongtai'
import tabbar from '@/components/public/tabbar/tabbar'
import header from '@/components/public/header/header-share'
import guanzhu from '@/pages/lyx/guanzhu'
import guanzhu1 from '@/pages/lyx/guanzhu.1'
import starguanzhu from '@/pages/lyx/starguanzhu'
import allguanzhu from '@/pages/lyx/allguanzhu'
import personalinformation from '@/pages/lyx/personal_information'
import personal from '@/pages/lyx/personal'
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
    {path: '/header', component: header},
    {path: '/dongtai', component: dongtai},
    {path: '/guanzhu', component: guanzhu},
    {path: '/guanzhu1', component: guanzhu1},
    {path: '/starguanzhu', component: starguanzhu},
    {path: '/allguanzhu', component: allguanzhu},
    {path: '/personalinformation', component: personalinformation},
    {path: '/personal', component: personal}
  ],
  linkActiveClass: 'mui-active'
})
