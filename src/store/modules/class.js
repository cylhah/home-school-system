import axios from 'axios'

const state = {
  classId: undefined,
  className: '',
  messageList: [],
  userList: [],
  notificationList: []
}

const mutations = {
  setMessageList (state, messageList) {
    state.messageList = messageList
  },
  setUserList (state, userList) {
    state.userList = userList
  },
  setClassName (state, className) {
    state.className = className
  },
  setClassId (state, classId) {
    state.classId = classId
  },
  setNotificationList (state, notificationList) {
    state.notificationList = notificationList
  }
}

const actions = {
  getMessageList ({commit}, classId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/class/${classId}/messages`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setMessageList', data.data.messageList)
          commit('setClassName', data.data.className)
          commit('setClassId', data.data.classId)
          resolve(data.data)
        } else {
          reject(res)
        }
      })
    })
  },
  getUserList ({commit}, classId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/class/${classId}/users`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setUserList', data.data.userList)
          commit('setClassName', data.data.className)
          commit('setClassId', data.data.classId)
          resolve(data.data)
        } else {
          reject(res)
        }
      })
    })
  },
  getNotificationList ({commit}, classId) {
    return new Promise((resolve, reject) => {
      axios.get('/api/notification', {
        params: { classId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setNotificationList', data.data)
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
