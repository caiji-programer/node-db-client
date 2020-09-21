import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import Home from './components/Home.vue'
// import Canv from './components/Canvas.vue'
// import DB from './components/DB.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  // { path: '/canvas', component: Canv },
  // { path: '/db', component: DB }
]

const router = new VueRouter({
  routes
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
