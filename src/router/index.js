import Vue from 'vue'
import VueRouter from 'vue-router'
//专门测试的页面:
import test from "../views/test.vue";
//欢迎登录界面:
import WelCome from '../views/WelCome'
//主页面:
import Home from '../views/Home.vue'
//用户管理下的--用户列表页面:
import Users from '@/components/Users'

Vue.use(VueRouter)

const routes = [
  {
    //默认去主界面:
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: 'welcome', component: WelCome }
    ]
  },
  {
    //主界面:
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: WelCome },
      //注意这里的path: 'users'不能加/users
      { path: 'users', component: Users }
    ]
  },
  {
    //登录页面:
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login.vue")
  },



]

const router = new VueRouter({
  routes
})
// 路由守卫功能 :
//挂载路由导航守卫
//to 将要访问的路径
//from 从哪个路径跳转而来
// next 表示一个方法
//直接放行:next（）；强制跳转到某个地址：next("/Login")
router.beforeEach((to, from, next) => {
  //如果要去登录页面,直接让它去
  if (to.path === '/login') return next();
  //如果之前登录过,那么后端就会返回给前端token,然后本地存储
  //这里直接获取token,有的话放行
  const token = window.sessionStorage.getItem('token')
  //如果 token没值，就表示没登陆,跳转到登录页面
  if (!token) return next('/login')
  //放行:
  next();
})
export default router
