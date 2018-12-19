import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

function getCookie (key) {
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return ''
  }
}

function setCookie (key, value, days) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + days)
  document.cookie = `${key}=${escape(value)};expires=${exdate.toUTCString()}`
}

const state = {
  userInfo: {
    userType: getCookie('userType'),
    userName: getCookie('userName'),
    userId: getCookie('userId'),
    userClassId: getCookie('userClassId'),
    userHeadUrl: getCookie('userHeadUrl'),
    userNickname: getCookie('userNickname')
  }
}

const getters = {
  isAdmin: state => {
    return state.userInfo.userRole === 'admin'
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setUserHeadUrl (state, userHeadUrl) {
    state.userInfo.userHeadUrl = userHeadUrl
  }
}

const actions = {
  login ({commit}, { userName, userPassword }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/login`, {
        params: { userName, userPassword }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          data.data.userHeadUrl = `api/img/userHead/${data.data.userHeadUrl}`
          commit('setUserInfo', data.data)
          setCookie('userType', data.data.userType, 30)
          setCookie('userName', data.data.userName, 30)
          setCookie('userId', data.data.userId, 30)
          setCookie('userClassId', data.data.userClassId, 30)
          setCookie('userHeadUrl', data.data.userHeadUrl, 30)
          setCookie('userNickname', data.data.userNickname, 30)
        }
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  uploadHead ({commit}, { userId, formData }) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/users/${userId}/userHead`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((res) => {
        const { data } = res
        data.data = `api/img/userHead/${data.data}`
        commit('setUserHeadUrl', data.data)
        setCookie('userHeadUrl', data.data, 30)
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  getCode ({commit}, { email }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/code`, {
        params: { email }
      }).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  getForgetPasswordCode ({commit}, { userEmail }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/forgetPasswordCode`, {
        params: { email: userEmail }
      }).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  getUserPasswordByUserName ({commit}, { userName }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/password`, {
        params: { userName }
      }).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  register ({commit}, { userName, userPassword }) {
    return new Promise((resolve, reject) => {
      axios.post(`${requestPrefix}/users`, {
        userName, userPassword, userType: 'normal'
      }).then((res) => {
        resolve(res)
      }).catch((reason) => {
        reject(reason)
      })
    })
  },
  exit ({commit}) {
    setCookie('userType', '', -1)
    setCookie('userName', '', -1)
    setCookie('userId', '', -1)
    setCookie('userClassId', '', -1)
    setCookie('userHeadUrl', '', -1)
    commit('setUserInfo', { userType: '' })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
