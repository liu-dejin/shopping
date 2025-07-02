import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
/* 全部导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
插件安装初始化
Vue.use(Vant) */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
