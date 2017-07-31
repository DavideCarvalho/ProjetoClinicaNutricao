// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Buefy from 'buefy'
import vueResource from 'vue-resource'
import 'buefy/lib/buefy.css'

import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
/* eslint-disable */
import Chart from 'chart.js'
/* eslint-enable */

Vue.use(VueChartkick, { Chartkick })
Vue.use(vueResource)
Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
