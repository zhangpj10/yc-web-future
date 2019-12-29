import Vue from 'vue';

import VueRouter from 'vue-router';

// 路由数据
import routes from './routers';

Vue.use(VueRouter);

// 免校验token白名单
const whiteList = ['/login'];
const router = new VueRouter({
  routes
});

// TODO: 路由拦截
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const login = {
      name: 'login'
    };
    next(login);
  }
});

export default router;
