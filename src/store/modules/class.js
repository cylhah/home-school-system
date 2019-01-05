import axios from 'axios'
import dict from '../../assets/js/chinese_dict'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  classInfo: {},
  messageList: [],
  userList: {},
  notificationList: [],
  userListDict: {}
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
  },
  setUserListDict (state) {
    let myDict = {}
    for (let key in state.userList) {
      let value = state.userList[key]
      let firstLetter = dict[value.userNickname[0]]
      if (!myDict[firstLetter]) {
        myDict[firstLetter] = []
      }
      myDict[firstLetter].push(value)
    }
    state.userListDict = myDict
  }
}

const actions = {
  postNotification ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/notifications/insertNotification`, data).then((res) => {
        const { data } = res
        if (data.code === 0) {
          resolve(res)
        }
      })
    })
  },
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
  getNotificationList ({commit}, {classId}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/notifications`, {
        params: { classId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setNotificationList', data.data)
        }
        resolve(res)
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
