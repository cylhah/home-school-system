import axios from 'axios'

const state = {
  dongtaiList: []
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
