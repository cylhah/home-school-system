import axios from 'axios'

const state = {
  news: {},
  newsList: []
}

const mutations = {
  setNews (state, news) {
    state.news = news
  },
  setnewsList (state, newsList) {
    state.newsList = newsList
  }
}

const actions = {
  getNewsById: async ({commit}, newsId) => {
    try {
      const { data } = await axios.get(`/news/${newsId}`)
      if (data.code === 0) {
        commit('setNews', data.news)
      }
    } catch (error) {
      console.log(error)
    }
  },
  getNewsListByUserId: async ({commit}, userId) => {
    try {
      const { data } = await axios.get('/news', {
        params: { userId }
      })
      if (data.code === 0) {
        commit('setnewsList', data.newsList)
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
