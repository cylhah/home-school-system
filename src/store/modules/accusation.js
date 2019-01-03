import axios from 'axios'
import { requestPrefix } from '../../config/httpConfig'

const state = {
  accusationList: []
}

const mutations = {
  setAccusationList (state, accusationList) {
    state.accusationList = accusationList
  }
}

const actions = {
  getAccusationList ({commit}, { pageNumber, pageSize }) {
    return new Promise((resolve, reject) => {
      axios.get(`${requestPrefix}/accuse/getAccusationByPage`, {
        params: { pageNumber, pageSize }
      }).then((res) => {
        const { data } = res
        if (data.code === 0) {
          commit('setAccusationList', data.data)
        }
        resolve(data.data)
      })
    })
  },
  updateAccusationStatus ({commit}, { accusationId, accusationStatus }) {
    let data = new FormData()
    data.append('accusationId', accusationId)
    data.append('accusationStatus', accusationStatus)
    return new Promise((resolve, reject) => {
      axios.put(`${requestPrefix}/accuse/updateAccusationStatus`, data).then((res) => {
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
