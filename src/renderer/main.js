import Vue from 'vue'
import App from './App'
import store from './store'
import axios from 'axios'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
