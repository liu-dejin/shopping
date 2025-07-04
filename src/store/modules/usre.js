import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有mutations第一个参数都是state
    setUserInfo (state, obj) {
      // 存vuex
      state.userInfo = obj
      // 存本地存储
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 个人信息重置
      context.commit('setUserInfo', {})
      // 购物车信息重置 跨模块操作  cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
