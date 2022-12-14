import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '小游戏数字连线' },
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/model',
    name: 'model',
    meta: { title: '答题连线' },
    component: () => import('../views/home/model.vue'),
  },
  {
    path: '/demo-view',
    name: 'demo-view',
    meta: { title: '连连看' },
    component: () => import('../views/demo-view/index.vue'),
  },
  {
    path: '/visual-field-following',
    name: 'visual-field-following',
    meta: { title: '灵动眼' },
    component: () => import('../views/visual-field-following/index.vue'),
  },
  {
    path: '/shortest-path',
    name: 'shortest-path',
    meta: { title: '最短路径' },
    component: () => import('../views/home/shortest-path.vue'),
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
