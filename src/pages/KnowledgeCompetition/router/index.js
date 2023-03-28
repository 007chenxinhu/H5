import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: { title: '世界之最知识竞赛' },
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
