// eslint-disable-next-line
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/assets/css/reset.scss'
//导入elementUi:
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入axios请求:
import axios from 'axios'
Vue.use(ElementUI);

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
