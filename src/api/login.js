import $axios from '@/service/httpServer';
// 登录
export const login = p =>
  $axios.post('/news/rest/login', p);
  export const register = p =>
  $axios.post('/news/rest/user/register', p);