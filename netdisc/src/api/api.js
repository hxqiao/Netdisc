/*
 * @Description  : 
 * @LastEditTime : 2022-06-23 17:45:11
 */
import axios from 'axios'
import { router } from '@/router';
import { Storage } from '@/utils/Storage';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { ElLoading } from 'element-plus';

const pendingMap = new Map();

const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0
};

// const interceptor_10 = ['market/video']

export default function myAxios(axiosConfig, customOptions, loadingOptions, axiosServiceConfig) {
  // console.log(`vueDouyinApi：${axiosConfig.url}`);
  const service = axios.create(Object.assign({
    // baseURL: import.meta.env.VITE_URL,
    baseURL: '/',
    timeout: 10000
  }, axiosServiceConfig))

  const custom_options = Object.assign({
    repeat_request_cancel: false, // 是否开启取消重复请求, 默认为 true
    loading: false, // 是否开启loading层效果, 默认为false
    reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
    error_message_show: false, // 是否开启接口错误信息展示,默认为true
    code_message_show: false, // 是否开启code不为0时的信息提示, 默认为true
  }, customOptions);
  
  // 请求拦截器
  service.interceptors.request.use(
    config => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例
      if (custom_options.loading){
        LoadingInstance._count++;
        if (LoadingInstance._count === 1){
          LoadingInstance._target = ElLoading.service(loadingOptions);
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      removePending(response.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      // 自定义状态码code处理
      if (response.data.code === 0){
        return response.data;
      } else if (!custom_options.code_message_show) {
        return response.data;
      } else { // 自定义错误码处理（code_message_show为true时关闭，注意与error_message_show请求错误码的区别）
        let message = '异常问题'
        resetMessage['error'](message)
        const response_tmp = {'data':[]}
        return response_tmp;
      }

    }, 
    error => {
      error.config && removePending(error.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      console.log(error);
      const { data: { message }} = error.response
      if (data && message) {
        ElMessage({
          type: 'error',
          message
        })
      }
      return Promise.reject(error.response);
    }
  );
  return service(axiosConfig)
}

/* 重设消息提示，多个API接口只显示一个 */
let messageInstance = null;
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message:options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})

/**
 * 处理异常
 * @param {*} error 
 */
function httpErrorStatusHandle(error){
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302: message = '接口重定向了！';break;
      case 400: message = '参数不正确！';break;
      case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
      case 403: message = '您没有权限操作！'; break;
      case 404: message = `请求地址出错: ${error.response.config.url}`; break; // 在正确域名下
      case 408: message = '请求超时！'; break;
      case 409: message = '系统已存在相同数据！'; break;
      case 500: message = '服务器内部错误！'; break;
      case 501: message = '服务未实现！'; break;
      case 502: message = '网关错误！'; break;
      case 503: message = '服务不可用！'; break;
      case 504: message = '服务暂时无法访问，请稍后再试！'; break;
      case 505: message = 'HTTP版本不受支持！'; break;
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
  
  ElMessage({
    type: 'error',
    message
  })
}

/**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options){
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0){
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config 
 */
function addPending(config){
  const pendingKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)){
      pendingMap.set(pendingKey, cancel);
    }
  });
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
function removePending(config){
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 生成每个请求唯一的键
 * @param {*} config 
 * @returns string
 */
function getPendingKey(config){
  let {url, method, params, data} = config;
  if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}