// eslint-disable-next-line
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 基础组件的自动化全局注册。全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
import '@/components/index.js'
// import '@/assets/css/reset.scss'
//导入elementUi:
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入axios请求:
import axios from 'axios'

Vue.config.productionTip = false

//忽略vue的警告:
Vue.config.silent = true
//绑定到prototype:以后直接用$http就可以使用axios,不用在每个里面引入axios了.
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
