import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta: {
    //   autentificado: true
    // }
  }
  
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  console.log(usuario);
  let autorizacion = to.matched.some(record => record.meta.autentificado);

  //A donde vas cuando no estas logeado e intentas ir a una página con autorización
  if (autorizacion && !usuario) {
    next('login');
    // A donde vas si la url ya esta bien
  } else {
    next();
  }

})
