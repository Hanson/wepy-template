export default {
  namespaced: true,
  state: {
    selected: 0
  },
  mutations: {
    switchTab(state, index) {
      state.selected = index
    },
  },
  actions: {
    switchTab({ state, commit}, index) {
      commit('switchTab', index)
    },
  }
};
