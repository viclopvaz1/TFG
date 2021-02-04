import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

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

  let app;

   firebase.auth().onAuthStateChanged(function(user) {
     if (!app){
      app = new Vue({
        store,
        router,
        created() {
          switch(performance.navigation.type) {
            case 0:
              console.info("TYPE_NAVIGATE");
              break;
            case 1: 
              console.info("TYPE_RELOAD");
              this.$store.dispatch('recuperarState');
              this.$store.dispatch('getAdmins');
              this.$store.dispatch('getData');
              break;
            case 2: 
              console.info("TYPE_BACK_FORWARD");
              this.$store.dispatch('recuperarState');
              break;  
            case 255:
              console.info("255");
              break;    
          }
        },
        render: h => h(App)
      }).$mount('#app')
     }
    
   });

  

  
  


