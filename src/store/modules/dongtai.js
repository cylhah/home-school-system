import axios from 'axios'

const state = {
  dongtaiList: [],
  TOLIST: [],
  NewsDetail: {},
  CommentList: []
}

const getters = {

}

const mutations = {
  SET_CURRENT_DONGTAI_LISTS (state, { dongtaiList }) {
    state.dongtaiList = dongtaiList
  },
  setNewsDetail (state, NewsDetail) {
    state.NewsDetail = NewsDetail
  },
  setCommentList (state, CommentList) {
    state.CommentList = CommentList
  }
}

const actions = {
  getDongtai ({ state, commit }) {
    axios.get('http://localhost:8081/static/dongtai.json').then((res) => {
      this.res = res
      commit('SET_CURRENT_DONGTAI_LISTS', { dongtaiList: res.data.dongtaiList })
      console.log(res.data.dongtaiList)
    })
  },
  sendComment ({state, commit}, data) {
    // axios.post('').then((res) => {
    //   this.res = res
    // })
    return new Promise((resolve, reject) => {
      axios.post('/api/comment/sendComment', data).then((res) => {
        console.log(res)
        resolve(res.data)
      }).catch((res) => {
        reject(res.data)
      })
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
  },
  getNewsDetailByNewsId ({ commit }, {toNewsId}) {
    return new Promise((resolve, reject) => {
      axios.get(`api/news/newsdetail/${toNewsId}`).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setNewsDetail', data.data)
          commit('setCommentList', data.data.newsComment)
        }
        resolve(res)
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
