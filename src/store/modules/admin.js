import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  registerDayCount: 0,
  registerWeekCount: 0,
  registerMonthCount: 0,
  newsAmountMonth: 0,
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
