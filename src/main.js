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
import './assets/fonts/iconfont.css'

Vue.use(ElementUI)
Vue.use(Mint)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
