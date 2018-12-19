import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import admin from './modules/admin'
import myClass from './modules/class'
import message from './modules/message'
import news from './modules/news'
import comment from './modules/comment'
import accusation from './modules/accusation'
import dongtai from './modules/dongtai'
import personal from './modules/personal'
import concern from './modules/concern'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user,
    admin,
    myClass,
    message,
    news,
    comment,
    accusation,
    dongtai,
    personal,
    concern
  }
})

export default store
