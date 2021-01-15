import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import {db} from '../main';

import firebase from 'firebase';

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
      centro: '',
      departamento: '',
      despacho: '',
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      horas: [],
      cursosDocentes: [],
      trabajosSupervisados: [],
      estancias: [],
      correoAlumnos: [],
      descripcion: '',
      seguidos: [],
      seguidores: [],
      comentarios: [],
      twitter: '',
      paginaPersonal: '',
      researchGate: '',
      seleccionPublica: [],
      seleccionPrivada: []
    },
    profesoresDB: [],
    registrado: false,
    tarjetaProfesor: {
      nombre: '',
      apellidos: '',
      email: '',
      contrasena: '',
      confirmarContrasena: '',
      foto: '',
      puntuacion: 0.0,
      centro: '',
      departamento: '',
      despacho: '',
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      horas: [],
      cursosDocentes: [],
      trabajosSupervisados: [],
      estancias: [],
      correoAlumnos: [],
      descripcion: '',
      seguidos: [],
      seguidores: [],
      comentarios: [],
      twitter: '',
      paginaPersonal: '',
      researchGate: '',
      seleccionPublica: [],
      seleccionPrivada: []
    }
    
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
    async updateFields() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.state.profesor.email).get();
        var p = await db.collection('profesores').doc(profesoresRef.docs[0].id);

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
        correoAlumnos: this.state.profesor.correoAlumnos,
        descripcion: this.state.profesor.descripcion,
        twitter: this.state.profesor.twitter,
        paginaPersonal: this.state.profesor.paginaPersonal,
        researchGate: this.state.profesor.researchGate
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        
      }
    },
    initialLogout() {
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
    async recuperarState() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', localStorage.getItem('userEmail')).get();
        console.log(profesoresRef.docs[0]);

        profesoresRef.forEach(doc => {
        let data = doc.data();
        this.state.profesor.nombre = data.nombre;
        this.state.profesor.apellidos = data.apellidos;
        this.state.profesor.email = data.email;
        this.state.profesor.contrasena = data.contrasena;
        this.state.profesor.confirmarContrasena = data.confirmarContrasena;
        this.state.profesor.foto = data.foto;
        this.state.profesor.puntuacion = data.puntuacion;
        this.state.profesor.centro = data.centro;
        this.state.profesor.departamento = data.departamento;
        this.state.profesor.despacho = data.despacho;
        this.state.profesor.proyectosDocentes = data.proyectosDocentes;
        this.state.profesor.publicacionesDocentes = data.publicacionesDocentes;
        this.state.profesor.publicaciones = data.publicaciones;
        this.state.profesor.horas = data.horas;
        this.state.profesor.cursosDocentes = data.cursosDocentes;
        this.state.profesor.trabajosSupervisados = data.trabajosSupervisados;
        this.state.profesor.estancias = data.estancias;
        this.state.profesor.correoAlumnos = data.correoAlumnos;
        this.state.profesor.descripcion = data.descripcion;
        this.state.profesor.seguidos = data.seguidos;
        this.state.profesor.seguidores = data.seguidores;
        this.state.profesor.comentarios = data.comentarios;
        this.state.profesor.twitter = data.twitter;
        this.state.profesor.paginaPersonal = data.paginaPersonal;
        this.state.profesor.researchGate = data.researchGate;
        this.state.profesor.seleccionPublica = [false, false, false, false, false, false, false, false, false, false];
        this.state.profesor.seleccionPrivada = [false, false, false, false, false, false, false, false, false, false, false];
        
        });
      } catch (error) {
        console.log(error);
      }
      if (this.state.profesor.email != '') {
        this.state.registrado = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.profesor.email, this.state.profesor.contrasena)
      }
      console.log(this.state.registrado)
    }
  },
  modules: {
  }
})
