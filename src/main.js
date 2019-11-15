import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
const path = require("path");
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);
// import filters from './filters' // 全局过滤器
// // 全局过滤器
// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})
Vue.config.productionTip = false

// 打印当前所处环境
console.log(process.env.VUE_APP_URL);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
