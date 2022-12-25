import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import {
  Toast,
  Tab,
  Tabs,
  Form,
  Field,
  Button,
  CellGroup,
  SwitchCell,
  RadioGroup,
  Radio,
  Cell,
} from 'vant'
import './style/common.scss'
import 'vant/lib/index.css'
import VueRouter from 'vue-router'
import router from './router'
import Fingerprint from 'fingerprintjs'
window.localStorage.setItem('deviceId', new Fingerprint().get())

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(SwitchCell)
  .use(CellGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

if (process.env.ENV !== 'prod') {
  // const VConsole = require('vconsole')
  // eslint-disable-next-line
  // new VConsole()
}
