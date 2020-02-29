// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
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

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

//引入QS
import QS from 'qs'
Vue.prototype.qs = QS;

//引入echarts
import echarts from 'echarts' 
Vue.prototype.$echarts = echarts //引入组件

import global from './globle/globleApi';
Vue.prototype.global = global;
axios.defaults.baseURL = global.baseURL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router:router
})

