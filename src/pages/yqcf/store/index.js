import Vue from 'vue';
import Vuex from 'vuex';
import yqadmin from './modules/yqadmin';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    yqadmin
  }
});
