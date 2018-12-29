import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  commentList: []
}

const mutations = {
  setCommentList (state, commentList) {
    state.commentList = commentList
  }
}

const actions = {
  getCommentListByUserId ({ commit }, { userId }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/comment/getCommentByUserId`, {
        params: { userId }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setCommentList', data.data)
        }
        resolve(res)
      })
    })
  },
  deleteCommentById ({ commit }, { commentId }) {
    return new Promise((resolve, reject) => {
      axios.delete(`${requestPrefix}/comment/${commentId}`).then((res) => {
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
