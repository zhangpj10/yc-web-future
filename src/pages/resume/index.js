import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles';
import router from './router';


Vue.use(VueParticles);
Vue.use(Element);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
