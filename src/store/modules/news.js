import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  news: {},
  newsList: []
}

const mutations = {
  setNews (state, news) {
    state.news = news
  },
  setNewsList (state, newsList) {
    state.newsList = newsList
  }
}

const actions = {
  getNewsById: async ({commit}, newsId) => {
    try {
      const { data } = await axios.get(`${requestPrefix}/news/${newsId}`)
      if (data.code === 0) {
        commit('setNews', data.data)
      }
    } catch (error) {
      console.log(error)
    }
  },
  getNewsListByUserId: async ({commit}, userId) => {
    try {
      const { data } = await axios.get(`${requestPrefix}/news`, {
        params: { userId }
      })
      if (data.code === 0) {
        commit('setNewsList', data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
