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
  {
    path: '/singleCategory',
    name: 'singleCategory',
    component: () => import('../views/single.vue'),
    meta: { title: '个人模式' },
  },
  {
    path: '/doubleCategory',
    name: 'doubleCategory',
    component: () => import('../views/double.vue'),
    meta: { title: '双人模式' },
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('../views/text.vue'),
    meta: { title: '测试模式' },
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
