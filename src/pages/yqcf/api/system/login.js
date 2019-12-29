import request from '@/pages/yqcf/plugin/axios';

export function AccountLogin(data) {
  return request({
    url: '/yqcf/account/login',
    method: 'post',
    data
  })
}
