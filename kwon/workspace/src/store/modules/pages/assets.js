/**
* assets store
*/

// getters
const getters = {
  depositList: state => state.depositInfo.list,
  deposit: state => state.deposit,
}

// actions
const actions = {
  setDepositInfo({commit}, params) {
    commit('setDepositInfo', params)
  },
  setDeposit({commit}, params) {
    commit('setDeposit', params)
  }
}

// mutations
const mutations = {
  setDepositInfo (state, data) {
    state.depositInfo = data
  },
  setDeposit (state, data) {
    state.deposit = data
  }
}

// state
const state = {
  depositInfo: [],
  deposit: {}
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
