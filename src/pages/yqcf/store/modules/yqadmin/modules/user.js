export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    set({ state }, info) {
      state.info = info;
    },
    get({ state }) {
      return state.info;
    }
  }
}
