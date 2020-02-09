// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import CryptoJS from "crypto-js";
Vue.prototype.CryptoJS = CryptoJS;

Vue.config.productionTip = false

import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementui)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router
})

