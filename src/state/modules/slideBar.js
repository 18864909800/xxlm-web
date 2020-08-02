export const state = {
  loadFlag: false,
}

export const getters = {}

export const mutations = {
  CHANGE_FLAG(state, loadFlag) {
    state.loadFlag = loadFlag
  },
}

export const actions = {
  changeLoadFlag({ commit, state, rootState }, { loadFlag }) {
    commit('CHANGE_FLAG', loadFlag)
  },
}
