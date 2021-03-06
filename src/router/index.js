// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish }

      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hehe')
  if (user) return next()
  next('/login')
})
export default router
