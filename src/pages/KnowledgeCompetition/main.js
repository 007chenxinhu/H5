import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import { getParameter } from './utils/indexExtends'
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
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
  .use(ElementUI)
  .use(Toast)
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
  .use(VueI18n)

// 加载所有语言环境并记住上下文
function loadMessages() {
  const context = require.context('./lang', true, /[a-z0-9-_]+.json$/i)
  const messages = context
    .keys()
    .map(key => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      (messages, { key, locale }) => ({
        ...messages,
        [locale]: context(key),
      }),
      {},
    )
  return { context, messages }
}
const { context, messages } = loadMessages()
console.log(messages, context, ',====);')
// VueI18n 实例
const langTypeMap = {
  zh: 'zh-CN',
  en: 'en-US',
}
Vue.use(VueI18n)

const lang = getParameter('language') || 'en'
const i18n = new VueI18n({
  locale: langTypeMap[lang], // 根据浏览器环境设置网站语言
  messages,
})

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
