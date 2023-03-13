import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '',
    redirect: '/random',
  },
  {
    path: '/random',
    name: 'random',
    meta: { title: '随机数' },
    component: () => import('../views/index.vue'),
  },

  // {
  //   path: '/home',
  //   name: 'home',
  //   meta: { title: '随机抽签首页' },
  //   component: () => import('../views/home/index.vue'),
  // },
  // {
  //   path: '/grouping',
  //   name: 'grouping',
  //   meta: { title: '分组' },
  //   component: () => import('../views/home/grouping.vue'),
  // },
  // {
  //   path: '/random-number',
  //   name: 'random-number',
  //   meta: { title: '选号' },
  //   component: () => import('../views/home/random-number.vue'),
  // },
]

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title
  next()
})

export default router
