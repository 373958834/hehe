import Vue from 'vue'
import App from './App.vue'

import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import components from '@/components'

// 导入axios
import axios from '@/api/axios'

// 导入全局样式
import '@/styles/index.less'

Vue.prototype.$http = axios

Vue.use(ELEMENT)
Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
