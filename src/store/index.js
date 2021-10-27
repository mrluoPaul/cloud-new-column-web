import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

import {
  Message
} from 'element-ui';

/**
 * 各个模块
 */

/**
 * api
 */
const state = {
  sideBarOpened: true,
  // app list 列表
  appSystemList: [],
  currentAppCode: '1263360366683852801',
  ossConfig: {}, // oss配置信息
  includeList: ['houseRent', 'houseDeal', 'customer', 'house-code']
};

const actions = {
  /**
   * 显示提示 msg.type 类型  msg.data 消息内容
   * @param commit
   * @param msg
   */
  showMessage({
    commit
  }, msg) {
    Message({
      type: msg.type || 'info',
      message: msg.data || msg.message
    });
  },
  doLogout() {
    // 跳转到登录

    router.push({
      name: 'Login'
    });

  }
  /**
   * 更新当前appCode
   * @param commit
   * @param msg
   */
};



Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
});
