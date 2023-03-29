import Vue from 'vue'
import App from './App.vue'
import './style/common.scss'
import 'vant/lib/index.css'
import VueRouter from 'vue-router'
import router from './router'
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
  Popup,
  Slider,
  Icon,
} from 'vant'
import './style/common.scss'
import 'vant/lib/index.css'

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
  .use(Popup)
  .use(Slider)
  .use(Icon)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

if (process.env.ENV !== 'prod') {
  // eslint-disable-next-line
}
