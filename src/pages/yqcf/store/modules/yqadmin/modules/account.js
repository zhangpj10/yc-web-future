// import router from '@/pages/yqcf/router';
import util from '@/pages/yqcf/libs/util';
import { AccountLogin } from '@/pages/yqcf/api/system/login';
import router from '@/pages/yqcf/router';

export default {
  namespaced: true,
  actions: {
    login({ commit, dispatch }, data = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin(data)
          .then(async (res) => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            util.cookies.set('uuid', res.userId);
            util.cookies.set('token', res.token);
            dispatch('yqadmin/user/setUser', res, { root: true });
            dispatch('yqadmin/fullscreen/listen', null, { root: true });
            commit('yqadmin/menu/asideSet', res.menuList, { root: true });
            // 结束
            resolve();
          })
          .catch((err) => {
            console.log('err: ', err);
            reject(err);
          });
      });
    },
    logout({ commit, dispatch }, { confirm = false } = {}) {
      util.cookies.remove('token');
      util.cookies.remove('uuid');
      window.clearVuexAlong(false, true);
      // 跳转路由
      router.push({
        name: 'login'
      });
      // 清空 vuex 用户信息
      // await dispatch('d2admin/user/set', {}, { root: true });
      window.location.reload();
    }
  }
};
