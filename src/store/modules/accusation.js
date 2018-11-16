import axios from 'axios'

const state = {
  accusationList: []
}

const mutations = {
  setAccusationList (state, accusationList) {
    state.accusationList = accusationList
  }
}

const actions = {
  getAccusationList ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/accusation').then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setAccusationList', data.data)
          resolve(data.data)
        } else {
          reject(res)
        }
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
