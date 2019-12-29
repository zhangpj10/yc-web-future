const _import = require(`@/pages/yqcf/libs/util.import.${process.env.NODE_ENV}`);

const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
];

const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' }
  },
  {
    path: 'index',
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
