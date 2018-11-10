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
    userRole: getCookie('userRole')
  }
})

const getters = {
  isAdmin: state => {
    return state.userInfo.userRole === 'admin'
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
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
        setCookie('userRole', 'admin', 30)
        commit(data.user)
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
