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
  actions: {},
  getters: {}
}
