import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/loading'
// 全局样式
import '@/styles/index.less' //
import '@/assets/iconfont/iconfont.css'
// 重置样式插件
import 'normalize.css/normalize.css'
// 路由守卫
import '@/static/routerGuards.js'
// vconsole调试工具
import '@/static/vconsole.js'
// rem适配
import '@/static/flexible.js'
// vant按需引入
import '@/static/importVant.js'

Vue.use(Loading)

Vue.config.productionTip = false

window.addEventListener(
  'popstate',
  function(e) {
    // console.log('-main-')
    router.isBack = true
  },
  false
)

// 检测vue版本，做兼容判断
let version = Vue.version.split('.')[0]
console.log(version)
if (version == 2) {
  console.log('v2')
} else if (version == 3) {
  console.log('v3')
} else {
  console.log('v1')
}

// 代替console.log打印
Vue.prototype.$log = window.console.log
//使用：  <div class="">{{ $log(info) }}</div>

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
