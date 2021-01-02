import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

import firebase from 'firebase';
import config from '@/config';

// Initialize Firebase
let app = firebase.initializeApp(config);
let db = app.database();
let profesoresRef1 = db.ref('profesores')
firebase.analytics();

export default new Vuex.Store({
  state: {
    profesor: {
      nombre: '',
      apellidos: '',
      email: '',
      contrasena: '',
      confirmarContrasena: '',
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      horas: [],
      cursosDocentes: [],
      trabajosSupervisados: [],
      estancias: []
    },
    profesoresRef: profesoresRef1
  },
  getters: {
    getField
  },
  mutations: {
    updateField
  },
  actions: {
  },
  modules: {
  }
})
