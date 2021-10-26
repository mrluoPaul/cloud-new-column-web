import Vue from 'vue'
import Home from '@/views/home/Home.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/new-details/NewDetails.vue')
  }
]
const router = new VueRouter({
  routes: routes
});

export default router;
