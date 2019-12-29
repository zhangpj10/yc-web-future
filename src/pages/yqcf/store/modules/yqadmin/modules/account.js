// import router from '@/pages/yqcf/router';
import util from '@/pages/yqcf/libs/util';
import { AccountLogin } from '@/pages/yqcf/api/system/login';

export default {
  namespaced: true,
  actions: {
    login({ dispatch }, data = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin(data)
          .then(async (res) => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // TODO: 返回格式替换，保存数据到cookies中
            util.cookies.set('uuid', res.userId);
            util.cookies.set('token', res.code);
            dispatch('yqadmin/user/set',res.data);
            // 结束
            resolve();
          })
          .catch((err) => {
            console.log('err: ', err);
            reject(err);
          });
      });
    }
  }
};
