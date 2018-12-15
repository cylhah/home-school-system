import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  classInfo: {},
  messageList: [],
  userList: {},
  notificationList: []
}

const mutations = {
  setClassInfo (state, classInfo) {
    state.classInfo = classInfo
  },
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
  },
  addMessage (state, message) {
    state.messageList.push(message)
  }
}

const actions = {
  getClassInfo ({commit}, {classId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/class/${classId}`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setClassInfo', data.data)
          resolve(res)
        }
      })
    })
  },
  getMessageList ({commit}, {classId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/messages`, {
        params: { classId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setMessageList', data.data)
          resolve(res)
        }
      })
    })
  },
  getUserList ({commit}, {classId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users`, {
        params: { classId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setUserList', data.data)
          resolve(res)
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
  },
  sendClassMessage ({commit}, message) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/messages/class`, message).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('addMessage', message)
          resolve(res)
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
