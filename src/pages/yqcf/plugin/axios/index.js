import axios from 'axios';

import { Message } from 'element-ui';
import router from '@/pages/yqcf/router';



const service = axios.create({
  timeout: 20000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // TODO: token拦截

    // 添加时间戳
    config.params = {
      ...(config.params || {}), _t: + new Date()
    };
    return config;
  },
  (error => {
    // 发生失败
    console.log(error);
    Promise.reject(error);
  })
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    debugger
    const res = response.data;
    const headers = response.headers;
    if (headers['content-type'] === 'application/vnd.ms-excel') {
      return response.data;
    }
    if (res.code !== 'success') { // 接口失败信息拦截
      res.code === 'CODE_SESSION_NOT_FOUND' && (res.message = '登陆信息已过期,请重新登陆!');
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      });
      // TODO: token登录信息验证，重定向路由
      return Promise.reject(res.message);
    }
    return res.data;
  },
  (error => {
    console.log(error);
      if (error.response && error.response.status === 401) {
        // util.cookies.remove();
        if (error.config.url.indexOf('logout') === -1) {
          Message({
            message: '登陆信息已过期,请重新登陆!',
            type: 'error',
            duration: 3 * 1000
          });
        }
        setTimeout(() => {
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          window.location.reload();
        }, 1000);
      } else if (error.response && error.response.status === 500) {
        console.log(new Error(`系统错误!: ${error.config.url}`));
      } else if (error.message && error.message.indexOf('timeout') > -1) {
        console.log(new Error(`网络超时!: ${error.config.url}`));
      } else if (error.type === '403') {
        console.log(new Error(`没有请求权限!: ${error.config.url}`));
      } else {
        console.log(new Error(`网络错误!: ${error.config.url}`));
      }
    return Promise.reject(error);
  })
);


export default service;
