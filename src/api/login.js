// 此处存放所有登录相关的接口请求
import request from '@/utils/requset'
// 1.获取图形验证码
export const getPicCode = () => {
  // 必须加上return 把promise对象返回
  return request({
    url: '/captcha/image'
  })
}
// 获取短信验证码
export const getMessage = (captchaCode, captchaKey, mobile) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'POST',
    data: {
      captchaCode, captchaKey, mobile
    }
  })
}

// 3.登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
