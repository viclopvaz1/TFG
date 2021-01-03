import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import {db} from '../main';

Vue.use(Vuex)

// import firebase from 'firebase';
// import config from '@/config';

// // Initialize Firebase
// let app = firebase.initializeApp(config);
// let db = app.database();
// let profesoresRef1 = db.ref('profesores')
// firebase.analytics();

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
    profesoresDB: []
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    SET_PROFESORESDB(state, profesores) {
      state.profesoresDB = profesores;
    }
  },
  actions: {
    //Metodo para actualizar la lista de profesores de la base de datos en profesoresDB
    async getData({commit}) {
      try {
        const listaProfesores = await db.collection('profesores').get();
        const profesores = [];
  
        listaProfesores.forEach(doc => {
          //console.log(doc.data());
          let profesorData = doc.data();
          profesorData.id = doc.id;
          profesores.push(profesorData);
        })
        commit('SET_PROFESORESDB', profesores);
        
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
