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
      foto: '',
      puntuacion: 0.0,
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      horas: [],
      cursosDocentes: [],
      trabajosSupervisados: [],
      estancias: [],
      correoAlumnos: []
    },
    profesoresDB: [],
    registrado: false
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
    },
    async updateFields(profesoresRef) {
      try {
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

      p.update( {
        nombre: this.state.profesor.nombre,
        apellidos: this.state.profesor.apellidos,
        contrasena: this.state.profesor.contrasena,
        confirmarContrasena: this.state.profesor.confirmarContrasena,
        foto: this.state.profesor.foto,
        proyectosDocentes: this.state.profesor.proyectosDocentes,
        publicacionesDocentes: this.state.profesor.publicacionesDocentes,
        publicaciones: this.state.profesor.publicaciones,
        cursosDocentes: this.state.profesor.cursosDocentes,
        trabajosSupervisados: this.state.profesor.trabajosSupervisados,
        estancias: this.state.profesor.estancias,
        correoAlumnos: this.state.profesor.correoAlumnos
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        
      }
    }
  },
  modules: {
  }
})
