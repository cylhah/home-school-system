import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'
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
  },
  addMessage (state, message) {
    state.messageList.push(message)
  }
}

const actions = {
  getMessageListOfOne ({commit}, {fromUserId, toUserId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/messages`, {
        params: { fromUserId, toUserId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setMessageList', data.data)
        }
        resolve(res)
      })
    })
  },
  getToUserInfo ({commit}, {toUserId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/${toUserId}`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setToUserInfo', data.data)
        }
        resolve(res)
      })
    })
  },
  sendMessage ({commit}, message) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/messages`, message).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('addMessage', message)
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
