import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '',
    meta: { title: '随机抽签' },
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '随机抽签' },
    component: () => import('../views/home/index.vue'),
  },
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
