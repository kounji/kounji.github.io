/**
* config store
*/
import types from '@/common/config/types'

// getters
const getters = {
  [types.MODAL.MODAL_CONFIG]: state => state[types.MODAL.MODAL_CONFIG],
}

// actions
const actions = {
  [types.MODAL.OPEN_MODAL]({commit}, data) {
    commit(types.MODAL.OPEN_MODAL, data)
  }
}

// mutations
const mutations = {
  [types.MODAL.OPEN_MODAL](state, data) {
    state[types.MODAL.MODAL_CONFIG] = data
  },
}

// state
const state = {
  [types.MODAL.MODAL_CONFIG]: {},
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
