import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Loader from './components/Loader'
import router from './router'
import store from './store'
import dateFilter from './Filters/dateFilter'
import currencyFilter from './Filters/currencyFilter'
import localizeFilter from './Filters/localizeFilter'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: "AIzaSyC7_51Nv1kS-ha-XgUNOCRyduQN3CPV9hI",
    authDomain: "vue-accountant.firebaseapp.com",
    databaseURL: "https://vue-accountant.firebaseio.com",
    projectId: "vue-accountant",
    storageBucket: "vue-accountant.appspot.com",
    messagingSenderId: "151943354736",
    appId: "1:151943354736:web:12cb3baf92dc3dcac897b5",
    measurementId: "G-25BRDJGYVX"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
