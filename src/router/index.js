import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import Dynamic from '@/pages/dynamic/dynamic'
import postdynam from '@/pages/dynamic/PostDynamci'
import personal from '@/pages/PersonalCenter/PersonalCenter'
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
