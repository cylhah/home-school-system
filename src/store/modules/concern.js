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
  getStarConcern ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/concern/getStarConcern/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('getStarConcern', res.data.data)
        }
        resolve(res)
      })
    })
  },
  getUserAllFans ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/concern/getUserAllFans/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('getUserAllFans', res.data.data)
        }
        resolve(res)
      })
    })
  },
  removeConcernsStar ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/removeConcernsStar`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  sendConcernStar ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/sendConcernStar`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  getAllConcern ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/concern/getAllConcern/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('getStarConcern', res.data.data)
        }
        resolve(res)
      })
    })
  },
  getAlluser ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/concern/getAlluser/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('getStarConcern', res.data.data)
        }
        resolve(res)
      })
    })
  },
  removeConcernsAll ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/removeConcernsAll`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  sendConcernAll ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/sendConcernAll`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  deleteConcern ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/deleteConcern`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  sendConcern ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/concern/sendConcern`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
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
