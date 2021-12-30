import Vue from 'vue'
import VueRouter from 'vue-router'
//专门测试的页面:
import test from "../views/test.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: test
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import("@/views/Login.vue")
  }

]

const router = new VueRouter({
  routes
})

export default router
