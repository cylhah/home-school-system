import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import Mint from 'mint-ui'
import router from './router'
import store from './store/index'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/style.min.css'
import './lib/mui/css/icons-extra.css'
import './css/stylegreen.scss'
import 'animate.css'
import qs from 'qs'

Vue.use(ElementUI)
Vue.use(Mint)
Vue.config.productionTip = false
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
