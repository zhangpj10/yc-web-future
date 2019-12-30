export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    setUser({ state }, info) {
      state.info = info;
    },
    getUser({ state }) {
      return state.info;
    }
  }
}
