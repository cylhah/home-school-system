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
  getNewsById ({commit}, {newsId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/news/${newsId}`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setNews', data.data)
        }
        resolve(res)
      })
    })
  },
  getNewsListByUserId: async ({commit}, {userId}) => {
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
  },
  deleteNewsById ({ commit }, { newsId }) {
    return new Promise((resolve, reject) => {
      axios.delete(`${requestPrefix}/news/${newsId}`).then((res) => {
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
