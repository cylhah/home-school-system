import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'
const state = {
  messageList: [],
  messageRecord: [],
  toUserInfo: {}
}

const mutations = {
  setMessageList (state, messageList) {
    state.messageList = messageList
  },
  setMessageRecord (state, messageRecord) {
    state.messageRecord = messageRecord
  },
  setToUserInfo (state, toUserInfo) {
    state.toUserInfo = toUserInfo
  },
  addMessage (state, message) {
    state.messageList.push(message)
  }
}

const actions = {
  getMessageRecord ({commit}, {userId, classId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/messages`, {
        params: { userId, classId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setMessageRecord', data.data)
        }
        resolve(res)
      })
    })
  },
  getMessageListOfOne ({commit}, {fromUserId, toUserId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/messages`, {
        params: { fromUserId, toUserId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0 || data.code === 1) {
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
  sendPersonalMessage ({commit}, message) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/messages/personal`, message).then((res) => {
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
