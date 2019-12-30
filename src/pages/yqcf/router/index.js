import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/pages/yqcf/store';
import util from '@/pages/yqcf/libs/util';

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
  const token = util.cookies.get('token');
  if (whiteList.indexOf(to.path) === -1 || to.meta.auth) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    if (token && token !== 'undefined') {
      // 拉取权限信息
      // if (!isFetchPermissionInfo) {
      //   await fetchPermissionInfo();
      //   next(to.path, true);
      // } else {
      //   next();
      // }
      next();
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      const login = {
        name: 'login'
      };
      next(login);
      // https://github.com/d2-projects/d2-admin/issues/138
      // NProgress.done();
    }
  } else if (to.name === 'login') {
    // 如果已经登录，则直接进入系统
    if (token && token !== undefined) {
      const fromPath = from.name === 'login' ? '/' : from.path;
      next(fromPath, true);
      // NProgress.done();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
