import axios from 'axios'

const state = {
  classInfo: {},
  messageList: [],
  personalInfo: {}
}

const mutations = {
  sendPersonalInform (state, personalInfo) {
    state.personalInfo = personalInfo
  },
  changeJianjie (state, personalInfo) {
    state.personalInfo = personalInfo
  }
}

const actions = {
  sendPersonalInform ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`api/personal1/Personalinform/${userId}`).then((res) => {
        const { data } = res
        console.log(res.data)
        if (data.code === 0) {
          commit('sendPersonalInform', res.data.data)
        }
        resolve(res)
      })
    })
  },
  jianjie ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/personal1/changeJianjie`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  address ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/personal1/changeAddress`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  phone ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/personal1/changePhone`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  interest ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/personal1/changeInterest`, params).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  work ({commit}, { userId, value }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('userId', userId)
      params.append('value', value)
      axios.put(`api/personal1/changeWork`, params).then((res) => {
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
