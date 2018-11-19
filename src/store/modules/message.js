import axios from 'axios'

const state = {
  messageList: [],
  toUserInfo: {}
}

const mutations = {
  setMessageList (state, messageList) {
    state.messageList = messageList
  },
  setToUserInfo (state, toUserInfo) {
    state.toUserInfo = toUserInfo
  }
}

const actions = {
  getMessageListOfOne ({commit}, fromUserId, toUserId) {
    return new Promise((resolve, reject) => {
      axios.get('/api/message', {
        params: { fromUserId, toUserId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setMessageList', data.data)
          resolve(data.data)
        } else {
          reject(res)
        }
      })
    })
  },
  getToUserInfo ({commit}, toUserId) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user', {
        params: { userId: toUserId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setToUserInfo', data.data)
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
