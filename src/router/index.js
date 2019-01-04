import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/user'
import Home from '@/pages/home/index'
import Admin from '@/pages/admin/index'
import chat from '@/pages/chat/index'
import myClass from '@/pages/class/index'
import notification from '@/pages/notification/index'
import message from '@/pages/message/index'
import userDataManage from '@/pages/admin/user-data-manage/index'
import userInfoManage from '@/pages/admin/user-info-manage/index'
import adminManage from '@/pages/admin/admin-manage/index'
import newsManage from '@/pages/admin/news-manage/index'
import userLogin from '@/pages/user-login/index'
import userRegister from '@/pages/user-register/index'
import forgetPassword from '@/pages/forget-password/index'
import Dynamic from '@/pages/dynamic/dynamic'
import AdminLogin from '@/pages/admin-login/index'
import postdynam from '@/pages/dynamic/PostDynamci'
import personalCenter from '@/pages/PersonalCenter/PersonalCenter'
import index2 from '@/pages/lyx/index2'
import dongtai from '@/pages/lyx/dongtai'
import tabbar from '@/components/public/tabbar/tabbar'
import header from '@/components/public/header/header-share'
import personalinformation from '@/pages/PersonalCenter/personal_information'
import personal from '@/pages/PersonalCenter/personal'
import cz from '@/pages/lyx/cz'
import czclick from '@/pages/lyx/cz-click'
import guanzhunew from '@/pages/guanzhu/guanzhu'
import tuijian from '@/pages/guanzhu/tuijian'
import starguanzhunew from '@/pages/guanzhu/starguanzhu'
import allguanzhunew from '@/pages/guanzhu/allguanzhu'
import fans from '@/pages/guanzhu/fans'
import mailList from '@/pages/mailList/index'
import index3 from '@/pages/lyx/index3'
import newsdetail from '@/pages/dynamic/newsdetail'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/grow',
      name: 'Home',
      component: Home
    },
    {
      path: '/fans',
      name: 'fans',
      component: fans
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/login',
      name: 'login',
      component: userLogin
    },
    {
      path: '/register',
      name: 'register',
      component: userRegister
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/chat/:toUserId',
      name: 'chat',
      component: chat
    },
    {
      path: '/class',
      name: 'class',
      component: myClass
    },
    {
      path: '/notification',
      name: 'notification',
      component: notification
    },
    {
      path: '/Dynamic',
      name: 'Dynamic',
      component: Dynamic
    },
    {
      path: '/postdynam',
      name: postdynam,
      component: postdynam
    },
    {
      path: '/tabbar',
      name: 'tabbar',
      component: tabbar
    },
    {path: '/header', component: header},
    {path: '/dongtai', component: dongtai},
    {
      path: '/cz',
      name: 'cz',
      component: cz
    },
    {
      path: '/czclick',
      name: 'czclick',
      component: czclick
    },
    {
      path: '/personalinformation',
      redirect: '/personal1',
      component: personalinformation,
      children: [
        {
          path: '/personal1',
          name: 'personal1',
          component: personal
        },
        {
          path: '/getNewByUserId',
          name: 'getNewByUserId',
          component: dongtai
        }
      ]
    },
    {
      path: '/newsdetail/:toNewsId',
      name: 'newsdetail',
      component: newsdetail
    },
    {
      path: '/index2',
      redirect: '/index2/index3/accordingTime',
      component: index2,
      children: [
        {
          path: 'index3',
          component: index3,
          children: [{
            path: 'accordingTime',
            name: 'accordingTime',
            component: dongtai
          },
          {
            path: 'accordingClass',
            name: 'accordingClass',
            component: dongtai
          },
          {
            path: 'accordingConcern',
            name: 'accordingConcern',
            component: dongtai
          },
          {
            path: 'accordingLike',
            name: 'accordingLike',
            component: dongtai
          }]
        },
        {
          path: 'message',
          name: 'message',
          component: message
        },
        {
          path: 'mailList',
          name: 'mailList',
          component: mailList
        },
        {
          path: 'personal',
          name: 'personal',
          component: personalCenter
        }
      ]
    },
    {
      path: '/guanzhunew',
      redirect: '/starguanzhunew',
      component: guanzhunew,
      children: [
        {
          path: '/guanzhunew',
          component: tuijian
        },
        {
          path: '/tuijain',
          name: 'tuijian',
          component: tuijian
        },
        {
          path: '/starguanzhunew',
          name: 'starguanzhunew',
          component: starguanzhunew
        },
        {
          path: '/allguanzhunew',
          name: 'allguanzhunew',
          component: allguanzhunew
        }
      ]
    }
  ],
  linkActiveClass: 'mui-active'
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
  let isAdmin = store.state.userInfo.userType === 'admin'
  if (isAdmin && !addFlag) {
    router.addRoutes(asyncRouterMap)
    addFlag = true
    next({...to, replace: true})
  } else if (isAdmin && to.path === '/adminLogin') {
    next('/admin')
  } else if (!isAdmin && to.path === '/admin') {
    next('/adminLogin')
  } else {
    next()
  }
})

export default router
