import axios from 'axios'

const state = {
  classInfo: {},
  messageList: [],
  personalInfo: {}
}

const mutations = {
  getStarConcern (state, personalInfo) {
    state.personalInfo = personalInfo
  }
}

const actions = {
  getMatureByTime ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/mature/getMatureByTime/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('getMatureByTime', res.data.data)
        }
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
