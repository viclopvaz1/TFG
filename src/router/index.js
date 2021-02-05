import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import PaginaPrincipal from '../views/PaginaPrincipal.vue'
import MiPerfil from '../views/MiPerfil.vue'
import Valoracion from '../views/Valoracion.vue'
import ValidacionHoras from '../views/ValidacionHoras.vue'
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
    path: '/paginaPrincipal',
    name: 'PaginaPrincipal',
    component: PaginaPrincipal
  },
  {
    path: '/miPerfil',
    name: 'MiPerfil',
    component: MiPerfil,
    meta: {
      autentificado: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta: {
    //   autentificado: true
    // }
  },
  {
    path: '/valoracion',
    name: 'Valoracion',
    component: Valoracion,
  },
  {
    path: '/validacionHoras',
    name: 'ValidacionHoras',
    component: ValidacionHoras,
  }
  
]

const router = new VueRouter({
  routes
})

export default router

// && !usuario && !store.state.registrado

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.autentificado);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

