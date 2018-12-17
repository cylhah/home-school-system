import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  registerDayCount: 0,
  registerWeekCount: 0,
  registerMonthCount: 0,
  newsAmountMonth: 0,
  userMonthAmount: [],
  userTypeAmount: [],
  newsMonthAmount: [],
  userList: [],
  adminList: []
}

const mutations = {
  setRegisterDayCount (state, registerDayCount) {
    state.registerDayCount = registerDayCount
  },
  setRegisterWeekCount (state, registerWeekCount) {
    state.registerWeekCount = registerWeekCount
  },
  setRegisterMonthCount (state, registerMonthCount) {
    state.registerMonthCount = registerMonthCount
  },
  setUserList (state, userList) {
    state.userList = userList
  },
  setAdminList (state, adminList) {
    state.adminList = adminList
  },
  setNewsAmountMonth (state, newsAmountMonth) {
    state.newsAmountMonth = newsAmountMonth
  },
  setUserMonthAmount (state, userMonthAmount) {
    state.userMonthAmount = userMonthAmount
  },
  setUserTypeAmount (state, userTypeAmount) {
    state.userTypeAmount = userTypeAmount
  },
  setNewsMonthAmount (state, newsMonthAmount) {
    state.newsMonthAmount = newsMonthAmount
  }
}

const actions = {
  getRegisterCount ({commit}, days) {
    let endTime = new Date()
    let startTime = new Date()
    startTime.setDate(endTime.getDate() - days)
    return new Promise((resolve, reject) => {
      axios.get('/api/users', {
        params: { startTime: startTime.getTime(), endTime: endTime.getTime() }
      }).then((res) => {
        const { data } = res
        if (days === 1) {
          commit('setRegisterDayCount', data.data.length)
        } else if (days === 7) {
          commit('setRegisterWeekCount', data.data.length)
        } else if (days === 30) {
          commit('setRegisterMonthCount', data.data.length)
        }
        resolve(res)
      })
    })
  },
  getUserList ({commit}, {startTime, endTime, userName}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/users', {
        params: { startTime, endTime, userName }
      }).then((res) => {
        const { data } = res
        commit('setUserList', data.data)
        resolve(res)
      })
    })
  },
  getAdminList ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/users', {
        params: { userType: 'admin' }
      }).then((res) => {
        const { data } = res
        commit('setAdminList', data.data)
        resolve(res)
      })
    })
  },
  addAdmin ({commit}, {userName, userPassword}) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users', {
        userType: 'admin', userName, userPassword
      }).then((res) => {
        resolve(res)
      })
    })
  },
  getNewsAmountByTime ({commit}, {startTime, endTime}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/news/amount`, {
        params: { startTime, endTime }
      }).then((res) => {
        const { data } = res
        commit('setNewsAmountMonth', data.data)
        resolve(res)
      })
    })
  },
  getUserPassword ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/password`, {
        params: { userId }
      }).then((res) => {
        resolve(res)
      })
    })
  },
  modifyPassword ({commit}, { userId, userPassword }) {
    let params = new URLSearchParams()
    params.append('userId', userId)
    params.append('userPassword', userPassword)
    return new Promise((resolve, reject) => {
      axios.put(`${requestPrefix}/users/password`, params).then((res) => {
        resolve(res)
      })
    })
  },
  getUserRegisterAmountAllMonth ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/monthAmount`).then((res) => {
        const { data } = res
        commit('setUserMonthAmount', data.data)
        resolve(res)
      })
    })
  },
  getUserRegisterAmountByType ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/users/typeAmount`).then((res) => {
        const { data } = res
        let result = []
        result[0] = data.data.student
        result[1] = data.data.teacher
        result[2] = data.data.parent
        result[3] = data.data.admin
        commit('setUserTypeAmount', result)
        resolve(res)
      })
    })
  },
  getNewsAmountAllMonth ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/news/monthAmount`).then((res) => {
        const { data } = res
        commit('setNewsMonthAmount', data.data)
        resolve(res)
      })
    })
  },
  deleteAdmin ({commit}, { userId }) {
    return new Promise((resolve, reject) => {
      axios.delete(`${requestPrefix}/users`, {
        params: { userId }
      }).then((res) => {
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
