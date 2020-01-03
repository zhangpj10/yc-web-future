import Vue from 'vue';
import VueRouter from 'vue-router';
import about from '../views/about';
import zuopin from '../views/zuopin';

// 路由数据
const routes = [
  {
    path: '/',
    redirect: { name: 'about' }
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/zuopin',
    name: 'zuopin',
    component: zuopin
  }
]

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

export default router;
