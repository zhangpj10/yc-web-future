import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/pages/yqcf/store';
import VueParticles from 'vue-particles';
// 核心插件
import yqAdmin from '@/pages/yqcf/plugin/yqadmin';


Vue.use(VueParticles);
Vue.use(yqAdmin, { store })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
