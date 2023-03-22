import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import 'lib-flexible/flexible'
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
Vue.use(VueI18n)
const langTypeMap = {
  zh: 'zh-CN',
  en: 'en-US',
}
const lang = getParameter('language') || 'en'
const i18n = new VueI18n({
  // locale: 'zh-CN',
  locale: langTypeMap[lang], // 根据浏览器环境设置网站语言
  messages,
})
new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')

// 切换语言(在组件内也可以使用$i18n.locale来切换语言环境)
// i18n.locale = 'en-US'

// 热更新支持
// if (module.hot) {
//   module.hot.accept(context.id, () => {
//     const { messages: newMessages } = loadMessages()

//     Object.keys(newMessages)
//       .filter(locale => messages[locale] !== newMessages[locale])
//       .forEach(locale => {
//         messages[locale] = newMessages[locale]
//         i18n.setLocaleMessage(locale, messages[locale])
//       })
//   })
// }

// if (process.env.ENV !== 'prod') {
// const VConsole = require('vconsole')
// eslint-disable-next-line
// new VConsole()
// }
