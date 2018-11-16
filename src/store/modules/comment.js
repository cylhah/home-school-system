import axios from 'axios'

const state = {
  commentList: []
}

const mutations = {
  setCommentList (state, commentList) {
    state.commentList = commentList
  }
}

const actions = {
  getCommentListByUserId: async ({commit}, userId) => {
    try {
      const { data } = await axios.get('/comment', {
        params: { userId }
      })
      if (data.code === 0) {
        commit('setCommentList', data.commentList)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
