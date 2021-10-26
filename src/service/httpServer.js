import axios from 'axios';
// import store from '@/store/index';
// import $config from '@/config/index';

import QS from 'qs';

// 正在进行中的请求列表
let reqList = [];

// 请求防抖拦截器
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || '';
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg);
      return;
    }
  }
  reqList.push(url);
};

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
// const allowRequest = function(reqList, url) {
//   for (let i = 0; i < reqList.length; i++) {
//     if (reqList[i] === url) {
//       reqList.splice(i, 1);
//       break;
//     }
//   }
// };

/**
 * 下载文件
 */
// let downloadFile = url => {
//   window.open(url);
// };

// 线上环境配置axios.defaults.baseURL，生产环境则用proxy代理
// if (process.env.NODE_ENV !== 'development') {
// axios.defaults.baseURL = $config.baseURL;
// axios.defaults.baseURL = 'http://118.121.58.171:8888';
axios.defaults.baseURL = 'http://118.121.58.171:8888';
// }
axios.defaults.timeout = 30000; // 超时时间

//请求拦截器
// axios.interceptors.request.use(
//   // debugger
//   config => {
//     // config.headers.appId = $config.appId;
//     // config.headers.AccessToken = window.localStorage.getItem('AccessToken') || '';
//     config.headers['Content-type'] = 'application/x-www-form-urlencoded';

//     // config.headers.AccessToken = 'f6b1d191-2513-4ed0-a0ce-5c3ceeeffc12';
//     config.headers['Access-Control-Allow-Origin'] = '*';
//     // let cancel;
//     // 设置cancelToken对象
//     // config.cancelToken = new axios.CancelToken(function (c) {
//     //   cancel = c;
//     // });
//     // // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
//     // stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`);
//     return config;
//   },
//   // error => {
//   //   return Promise.reject(error);
//   // }
// );
//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    // 增加延迟，相同请求不得在短时间内重复发送
    // setTimeout(() => {
    //   allowRequest(reqList, response.config.url);
    // }, 1000);

    if (response.data) {
      return Promise.resolve(response.data);
    } else {
      // store.dispatch('showMessage', {
      //   type: 'error',
      //   message: response.data.message || response.data.msg || response.data.errMsg
      // });
      return Promise.reject(
        response.data.message || response.data.msg || response.data.errMsg,
        response
      );
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求';
          break;
        case 401:
          err.message = '未授权，请重新登录';
          // store.dispatch('doLogout');
          break;
        case 403:
          err.message = '没有访问权限，拒绝访问';
          this.$router.push("/");
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          break;
        case 405:
          err.message = '请求方法未允许';
          break;
        case 500:
          err.message = err.response.data.message || '服务器端出错';
          break;
        default:
          err.message = `连接错误${err.response.msg}`;
          break;
      }
    } else {
      err.message = '连接到服务器失败';
    }
    if (err.response && err.response.status !== 401) {
      store.dispatch('showMessage', {
        type: 'error',
        message: err.message || err.response.msg
      });
    }
    return Promise.reject(err.response, err);
  }
);

export default {
  //get请求
  get(url, param, header) {
    return axios({
      method: 'get',
      url,
      headers: {
        ...(header || {})
      },
      params: param || {}
    });
  },
  //post请求
  post(url, param, header) {
    return axios({
      method: 'post',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/json;charse=UTF-8'
      },
      data: param || {}
    });
  },
  //post请求
  put(url, param, header) {
    return axios({
      method: 'put',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/json;charse=UTF-8'
      },
      data: param || {}
    });
  },
  // delete
  delete(url, param, header) {
    return axios({
      method: 'delete',
      url,
      headers: {
        ...(header || {})
      },
      params: param || {}
    });
  },
  //post请求
  postFormData(url, param, header) {
    return axios({
      method: 'post',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: QS.stringify(param) || {}
    });
  },
  // 直接导出文件
  /**
   *
   * @param {*} url 请求地址
   * @param {*} param 参数
   * @param {*} fileName 导出的文件名
   * @param {*} fileType 文件后缀名
   * @param {*} header 请求头
   * @param {*} method 请求方式
   */
  exportFile(url, param, fileName, fileType, method = 'get', header) {
    let keys = {
      get: 'params',
      post: 'data'
    };
    axios({
        method: method,
        url,
        responseType: 'blob',
        headers: {
          ...(header || {})
        },
        [keys[method]]: param || {}
      })
      .then(res => {
        let url = URL.createObjectURL(res),
          a = document.createElement('a');
        a.download = (fileName || '导出文件') + '.' + (fileType || 'xlsx');
        a.href = url;
        a.click();
      })
      .catch(err => {
        throw new Error('导出文件失败');
      });
  }
};
