// 此处存放所有登录相关的接口请求
import request from '@/utils/requset'
// 1.获取图形验证码
export const getPicCode = () => {
  // 必须加上return 把promise对象返回
  return request({
    url: 'http://smart-shop.itheima.net/index.php?s=/api/captcha/image'
  })
}
