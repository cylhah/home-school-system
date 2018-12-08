import axios from 'axios'

const state = {
  dongtaiList: [],
  TOLIST: []
}

const getters = {

}

const mutations = {
  SET_CURRENT_DONGTAI_LISTS (state, { dongtaiList }) {
    state.dongtaiList = dongtaiList
  }
}

const actions = {
  getDongtai ({ state, commit }) {
    axios.get('http://localhost:8080/static/dongtai.json').then((res) => {
      this.res = res
      commit('SET_CURRENT_DONGTAI_LISTS', { dongtaiList: res.data.dongtaiList })
      console.log(res.data.dongtaiList)
    })
  },
  sendComment ({state, commit}) {
    axios.post('http://localhost:8080/static/dongtai.json').then((res) => {
      this.res = res
    })
  },
  sendnews ({ state, commit }, { userId, Imgstr, VideoStr, Content }) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams()
      params.append('newsUserId', userId)
      params.append('newsImageURLs', Imgstr)
      params.append('newsVideoURLs', VideoStr)
      params.append('newsContent', Content)
      axios.post('/api/news/sendnews', params).then((res) => {
        // console.log(res.data.msg)
        if (res.data.code === 0) {
          resolve(res.data.msg)
        }
      }).catch((res) => {
        reject(res.data.msg)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
