<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{second==totalSecond?'获取验证码':second+'秒后重新发送'}}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMessage, codeLogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 图形验证码
      picKey: '', // 唯一key
      picUrl: '', // 请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数 开定时器 second--
      timer: null,
      mobile: '', // 手机号
      smsCode: ''// 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图片验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 唯一key
      this.$toast('获取图形验证码成功')
    },
    // 校验手机号和图形验证码是否合法
    // 通过true 不通过false
    validFn () {
      if (!/^1[1-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 没通过校验没必要往下走
        return
      }
      // 当前没有定时器开启 且当前秒数=总秒数(归位)才开启定时器
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求 如果响应的status不是200 抛出一个错误的promise错误 await只会等待正确的promise
        await getMessage(this.picCode, this.picKey, this.mobile)
        // console.log(res)
        this.$toast('验证码获取成功,注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          // console.log('正在倒计时')
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器id
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn) {
        return
      }
      if (/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的验证码')
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('恭喜登录成功')
      this.$router.push('/')
    }
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
