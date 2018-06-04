import Vue from 'vue'
import App from './App'
import store from './store'
import axios from 'axios'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const serverBus = new Vue()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueFire)
firebase.initializeApp({
  apiKey: 'AIzaSyD-kRIHn5sjF52coD0NBjIh8Aq1WT0bslg',
  authDomain: 'telegramid-be9c5.firebaseapp.com',
  databaseURL: 'https://telegramid-be9c5.firebaseio.com',
  projectId: 'telegramid-be9c5',
  storageBucket: 'telegramid-be9c5.appspot.com',
  messagingSenderId: '562616999669'
})

export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
