// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router"
import "./common/reset.css"
import "./common/mixins.styl"
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$http = axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router
})
