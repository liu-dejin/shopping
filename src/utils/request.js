import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例,对创建axios实例进行自定义配置
// 好处:不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})

// 自定义配置 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启lodaing效果 节流处理 防止多次无效触发
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 图标
    duration: 0 // 不会自动消失
  })

  // 只要有token ,请求时即使携带 便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'h5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器 统一处理错误
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多一层data,需要响应拦截器处理一下)
  const res = response.data
  // console.log(res)
  if (res.status !== 200) {
    // 提示
    // 单例模式,只会存在一个Toast,后面的Toast会覆盖前面的Toast
    Toast(res.message)
    // 抛出promise
    return Promise.reject(res.message)
  } else {
    // 正常逻辑走核心逻辑,清除loading效果
    Toast.clear()
  }
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出配置好的实例
export default instance
