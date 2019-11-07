import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
const path = require("path");
// vant
// import { Button, Swipe, SwipeItem, Lazyload } from "vant";
// Vue.use(Button).use(Swipe).use(SwipeItem).use(Lazyload);

// import filters from './filters' // 全局过滤器
// // 全局过滤器
// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))


Vue.config.productionTip = false

// 打印当前所处环境
console.log(process.env.VUE_APP_URL);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
