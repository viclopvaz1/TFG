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
              //this.$store.dispatch('initialLogout');
              //store.state.registrado = false;
              //firebase.auth().signOut();
              break;
            case 1: 
              console.info("TYPE_RELOAD");
              this.$store.dispatch('recuperarState');
              break;
            case 2: 
              console.info("TYPE_BACK_FORWARD");
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

  

  
  


