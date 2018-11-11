// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/style.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './css/stylegreen.scss'
import MintUI from 'mint-ui'
import './assets/iconfont/iconfont.css'
Vue.use(MintUI)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
