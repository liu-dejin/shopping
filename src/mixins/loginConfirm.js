export default {
  // 此处编写的就是vue组件实例的配置项 可以直接混入到组件内部
  // data method 生命周期韩函数
  // 注意点 1.此处和组件内都存在同名data和methods 则组件内优先级更好
  // 2.如果编写了生命周期函数,则mixins中的生命周期函数和页面的生命周期函数 会用数组管理统一执行

  // 登录确认框
  // 已登录返回true,未登录返回false
  loginConfirm () {
    // 1.token不存在 弹对话框
    if (!this.$store.getters.token) {
      // 弹对话框
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '此操作需要先登录',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
        .then(() => {
          // 如果希望跳转到登录=>登录后回弹回来,跳转去携带参数(当前路径参数)
          // this.$route.fullPath(会包含查询参数)
          // push累加历史界面 replace不会
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        })
        .catch(() => {})
      return true
    }
    return false
  }
}
