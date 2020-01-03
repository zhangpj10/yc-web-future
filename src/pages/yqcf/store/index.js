import Vue from 'vue';
import Vuex from 'vuex';
import yqadmin from './modules/yqadmin';
import createVuexAlong from 'vuex-along';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    yqadmin
  },
  plugins: [
    createVuexAlong({
      name: 'yqadmin-vuex-along',
      session: {
        // 保存模块 user 中的 info 到 sessionStorage
        list: ["yqadmin.user.info"]
      }
    })
  ]
});
