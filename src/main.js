import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import firebase from 'firebase';
import 'firebase/firestore';
import config from '@/config';

// Initialize Firebase
firebase.initializeApp(config);

export const db = firebase.firestore();


  // firebase.auth().onAuthStateChanged(function(user) {
    
  // });

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')


