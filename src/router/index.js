import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import Dynamic from '@/pages/dynamic/dynamic'

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
    }
  ]
})
