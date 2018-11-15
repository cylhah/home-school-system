import axios from 'axios'

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

const state = () => ({
  userInfo: {
    userRole: getCookie('userRole'),
    userName: getCookie('userName')
  },
  res: {}
})

const getters = {
  isAdmin: state => {
    return state.userInfo.userRole === 'admin'
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setMsg (state, msg) {
    state.msg = msg
  },
  setRes (state, code, msg) {
    state.res.code = code
    state.res.msg = msg
  }
}

const actions = {
  login: async ({commit}, username, passowrd) => {
    try {
      const { data } = await axios.post('/user/login', {
        username,
        passowrd
      })
      if (data.code === 0) {
        setCookie('userRole', data.user.userRole, 30)
        setCookie('userName', data.user.userName, 30)
        commit('setUserInfo', data.user)
        commit('setRes', data.code, data.msg)
      } else {
        commit('setMsg', '用户名或密码错误')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
