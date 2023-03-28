import Vue from 'vue'
import App from './App.vue'
import { Toast } from 'vant'
import './style/common.scss'
import 'vant/lib/index.css'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Toast)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

if (process.env.ENV !== 'prod') {
  // eslint-disable-next-line
}
