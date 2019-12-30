const _import = require(`@/pages/yqcf/libs/util.import.${process.env.NODE_ENV}`);

const loginPage = [
  {
    path: '/login',
    name: 'login',
    meta: {
      auth: false // 该路由是否需要登录权限
    },
    component: _import('system/login')
  }
];

const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' }
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      auth: true
    },
    component: _import('system/index')
  }
];

export default [
  ...loginPage,
  ...frameIn
];
