import * as types from '../mutation-types'

const state = {
  placeholder: {}
}

// getters
const getters = {
  getplaceholder: state => state.placeholder
}

// actions
const actions = {
  setplaceholder ({ commit, state }, placeholder) {
    commit(types.GET_PLACEHOLDER, { placeholder })
  }
}

// mutations
const mutations = {
  [types.GET_PLACEHOLDER] (state, { placeholder }) {
    state.placeholder = placeholder
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
