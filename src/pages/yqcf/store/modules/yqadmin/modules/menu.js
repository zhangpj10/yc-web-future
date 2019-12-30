export default {
  namespaced: true,
  state: {
    // 侧栏菜单
    aside: [],
    // 侧边栏收缩
    asideCollapse: false
  },
  actions: {
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet({ state, dispatch }, collapse) {
        state.asideCollapse = collapse;
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ state, dispatch }) {
        state.asideCollapse = !state.asideCollapse;
    }
  },
  mutations: {
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu;
    }
  }
};
