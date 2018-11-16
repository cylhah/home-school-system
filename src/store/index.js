import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import news from './modules/news'
import comment from './modules/comment'
import accusation from './modules/accusation'
import dongtai from './modules/dongtai'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user,
    news,
    comment,
    accusation,
    dongtai
  }
})

export default store
