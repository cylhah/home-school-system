import axios from 'axios'

const state = () => ({
  news: {},
  newsList: []
})

const getters = {
  isAdmin: state => {
    return state.userInfo.userRole === 'admin'
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setMsg (state, msg) {
    state.msg = msg
  },
  setRes (state, code, msg) {
    state.res.code = code
    state.res.msg = msg
  }
}

const actions = {
  getNewsById: async ({commit}, newsId) => {
    try {
      const { data } = await axios.get(`/news/${newsId}`)
      if (data.code === 0) {
        commit('setRes', data.code, data.msg)
      } else {
        commit('setMsg', '用户名或密码错误')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
