import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import {db} from '../main';

import firebase from 'firebase';

Vue.use(Vuex)

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
      puntuacionComentario: 0.0,
      centro: '',
      departamento: '',
      despacho: '',
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      publicacionesSeguidos: [],
      horas: [],
      urlArchivoHoras: '',
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
      puntuacionComentario: 0.0,
      centro: '',
      departamento: '',
      despacho: '',
      proyectosDocentes: [],
      publicacionesDocentes: [],
      publicaciones: [],
      publicacionesSeguidos: [],
      horas: [],
      urlArchivoHoras: '',
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
    administrador: {
      email: '',
      contrasena: ''
    },
    administradoresDB: [],
    profesoresBusqueda: [],
    publicacionesBusqueda: [],
    profesorPublicaciones: {
      nombre: '',
      apellidos: '',
      email: '',
      foto: '',
      publicacionesDocentes: [],
      publicaciones: []
    },
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    SET_PROFESORESDB(state, profesores) {
      state.profesoresDB = profesores;
    },
    SET_ADMINISTRADORESDB(state, administradores) {
      state.administradoresDB = administradores;
    },
    CLEAN_PUBLICACIONESSEGUIDOS(state) {
      state.profesor.publicacionesSeguidos = [];
    }
  },
  actions: {
    //Metodo para actualizar la lista de profesores de la base de datos en profesoresDB
    async getData({commit}) {
      try {
        const listaProfesores = await db.collection('profesores').get();
        const profesores = [];

        listaProfesores.forEach(doc => {
          let profesorData = doc.data();
          profesorData.id = doc.id;
          profesores.push(profesorData);
        })
        commit('SET_PROFESORESDB', profesores);
        return profesores;
      } catch (error) {
        console.log(error);
      }
    },
    async getAdmins({commit}) {
      try {
        const listaAdmins = await db.collection('administradores').get();
        const administradores = [];

        listaAdmins.forEach(doc => {
          let administradorData = doc.data();
          administradorData.id = doc.id;
          administradores.push(administradorData);
        })
        commit('SET_ADMINISTRADORESDB', administradores);
        return administradores;


      } catch (error) {
        console.log(error);
      }
    },
    setAdmins({commit}){
      commit('SET_ADMINISTRADORESDB', administradores);
    },
    async updateFields() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.state.profesor.email).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

      p.update( {
        nombre: this.state.profesor.nombre,
        apellidos: this.state.profesor.apellidos,
        contrasena: this.state.profesor.contrasena,
        confirmarContrasena: this.state.profesor.confirmarContrasena,
        foto: this.state.profesor.foto,
        centro: this.state.profesor.centro,
        departamento: this.state.profesor.departamento,
        despacho: this.state.profesor.despacho,
        proyectosDocentes: this.state.profesor.proyectosDocentes,
        publicacionesDocentes: this.state.profesor.publicacionesDocentes,
        publicaciones: this.state.profesor.publicaciones,
        horas: this.state.profesor.horas,
        urlArchivoHoras: this.state.profesor.urlArchivoHoras,
        cursosDocentes: this.state.profesor.cursosDocentes,
        trabajosSupervisados: this.state.profesor.trabajosSupervisados,
        estancias: this.state.profesor.estancias,
        correoAlumnos: this.state.profesor.correoAlumnos,
        descripcion: this.state.profesor.descripcion,
        seguidos: this.state.profesor.seguidos,
        twitter: this.state.profesor.twitter,
        paginaPersonal: this.state.profesor.paginaPersonal,
        researchGate: this.state.profesor.researchGate,
        seleccionPublica: this.state.profesor.seleccionPublica,
        seleccionPrivada: this.state.profesor.seleccionPrivada,
        puntuacion: this.state.profesor.puntuacion,
        puntuacionComentario: this.state.profesor.puntuacionComentario
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        console.log(error);
      }
    },
    async updateBotones() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.email).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

      p.update( {
        seleccionPublica: this.state.tarjetaProfesor.seleccionPublica,
        seleccionPrivada: this.state.tarjetaProfesor.seleccionPrivada
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        console.log(error);
      }
    },
    async updateHoras() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.state.profesor.email).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

      p.update( {
        horas: this.state.profesor.horas,
        puntuacion: this.state.profesor.puntuacion,
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        console.log(error);
      }
    },
    async updateSeguidores() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.email).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

      p.update( {
        seguidores: this.state.tarjetaProfesor.seguidores,
        puntuacion: this.state.tarjetaProfesor.puntuacion,
        puntuacionSeguidores: this.state.tarjetaProfesor.puntuacionSeguidores
      })
      .then(function() {
        console.log("Document changed");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
      } catch (error) {
        console.log(error);
      }
    },
    async updateListaSeguidores() {
      try {
        for (let seguidor in this.state.tarjetaProfesor.seguidores) {
          const profesoresRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.seguidores[seguidor].email.toLowerCase()).get();

          profesoresRef.forEach(doc => {
          let data = doc.data();
          this.state.tarjetaProfesor.seguidores[seguidor].nombre = data.nombre;
          this.state.tarjetaProfesor.seguidores[seguidor].apellidos = data.apellidos;
          this.state.tarjetaProfesor.seguidores[seguidor].foto = data.foto;
          this.state.tarjetaProfesor.seguidores[seguidor].puntuacion = data.puntuacion;
          this.state.tarjetaProfesor.seguidores[seguidor].email = data.email;
          });
        }
        const tarjetaProfesorRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.email.toLowerCase()).get();

        var p = db.collection('profesores').doc(tarjetaProfesorRef.docs[0].id);

        p.update({
          seguidores: this.state.tarjetaProfesor.seguidores
          })
          .then(function() {
              console.log("Document changed");
          })
          .catch(function(error) {
              console.log("Error: " + error);
          })
      } catch (error) {
        console.log(error);
      }

    },
    async updateListaSeguidos() {
      try {
        for (let seguido in this.state.tarjetaProfesor.seguidos) {
          const profesoresRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.seguidos[seguido].email.toLowerCase()).get();

          profesoresRef.forEach(doc => {
            let data = doc.data();
            this.state.tarjetaProfesor.seguidos[seguido].nombre = data.nombre;
            this.state.tarjetaProfesor.seguidos[seguido].apellidos = data.apellidos;
            this.state.tarjetaProfesor.seguidos[seguido].foto = data.foto;
            this.state.tarjetaProfesor.seguidos[seguido].puntuacion = data.puntuacion;
            this.state.tarjetaProfesor.seguidos[seguido].email = data.email;
          });
        }
        const tarjetaProfesorRef = await db.collection('profesores').where('email', '==', this.state.tarjetaProfesor.email.toLowerCase()).get();

        var p = db.collection('profesores').doc(tarjetaProfesorRef.docs[0].id);

        p.update({
            seguidos: this.state.tarjetaProfesor.seguidos
          })
          .then(function() {
              console.log("Document changed");
          })
          .catch(function(error) {
              console.log("Error: " + error);
          })
      } catch (error) {
        console.log(error);
      }
    },
    async ordenaYActualizaPublicacionesSeguidos({commit, dispatch}) {
      try {
        var publicaciones = [];
        for (let seguido in this.state.profesor.seguidos) {
          const profesoresRef = await db.collection('profesores').where('email', '==', this.state.profesor.seguidos[seguido].email.toLowerCase()).get();

          var profesorPublicacionesSeguidos = {
            nombre: '',
            apellidos: '',
            foto: '',
            email: '',
            publicacion: []
          };

          var profesorPublicacionesDocenteSeguidos = {
            nombre: '',
            apellidos: '',
            foto: '',
            email: '',
            publicacion: []
          };

          profesoresRef.forEach(doc => {
            let data = doc.data();
            profesorPublicacionesSeguidos.publicacion = data.publicaciones;
            profesorPublicacionesSeguidos.nombre = data.nombre;
            profesorPublicacionesSeguidos.apellidos = data.apellidos;
            profesorPublicacionesSeguidos.foto = data.foto;
            profesorPublicacionesSeguidos.email = data.email;
            profesorPublicacionesDocenteSeguidos.publicacion = data.publicacionesDocentes;
            profesorPublicacionesDocenteSeguidos.nombre = data.nombre;
            profesorPublicacionesDocenteSeguidos.apellidos = data.apellidos;
            profesorPublicacionesDocenteSeguidos.foto = data.foto;
            profesorPublicacionesDocenteSeguidos.email = data.email;
          });

          if (profesorPublicacionesSeguidos.publicacion.length > 0) {
            profesorPublicacionesSeguidos.publicacion.sort((a, b) => (a.horaSubida < b.horaSubida) ? 1 : -1);
            profesorPublicacionesSeguidos.publicacion = profesorPublicacionesSeguidos.publicacion[0];
            publicaciones.push(profesorPublicacionesSeguidos);
          }
          if (profesorPublicacionesDocenteSeguidos.publicacion.length > 0){
            profesorPublicacionesDocenteSeguidos.publicacion.sort((a, b) => (a.horaSubida < b.horaSubida) ? 1 : -1);
            profesorPublicacionesDocenteSeguidos.publicacion = profesorPublicacionesDocenteSeguidos.publicacion[0];
            publicaciones.push(profesorPublicacionesDocenteSeguidos);
          }
        }
        dispatch("updatePublicacionesSeguidos", {publicaciones: publicaciones})
      } catch (error) {
        console.log(error);
      }
    },
    async updatePublicacionesSeguidos({commit}, payload){
      const profesorRef = await db.collection('profesores').where('email', '==', this.state.profesor.email.toLowerCase()).get();

        var p = db.collection('profesores').doc(profesorRef.docs[0].id);

        payload.publicaciones.sort((a, b) => (a.publicacion.horaSubida < b.publicacion.horaSubida) ? 1 : -1);
        this.state.profesor.publicacionesSeguidos = payload.publicaciones;

        p.update({
          publicacionesSeguidos: this.state.profesor.publicacionesSeguidos
          })
          .then(function() {
              console.log("Document changed");
          })
          .catch(function(error) {
              console.log("Error: " + error);
          })
    },
    initialLogout() {
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
    async recuperarStateAdmin({ commit }, payload) {
      try {
        const administradoresRef = await db.collection('administradores').where('email', '==', payload.email).get();

        administradoresRef.forEach(doc => {
        let data = doc.data();
        this.state.administrador.email = data.email;
        this.state.administrador.contrasena = data.contrasena;
        });

      } catch (error) {
          console.log(error);
      }
    },
    async recuperarState({ commit }, payload) {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', payload.email).get();

        profesoresRef.forEach(doc => {
        let data = doc.data();
        this.state.profesor.nombre = data.nombre;
        this.state.profesor.apellidos = data.apellidos;
        this.state.profesor.email = data.email;
        this.state.profesor.contrasena = data.contrasena;
        this.state.profesor.confirmarContrasena = data.confirmarContrasena;
        this.state.profesor.foto = data.foto;
        this.state.profesor.puntuacion = data.puntuacion;
        this.state.profesor.puntuacionComentario = data.puntuacionComentario;
        this.state.profesor.centro = data.centro;
        this.state.profesor.departamento = data.departamento;
        this.state.profesor.despacho = data.despacho;
        this.state.profesor.proyectosDocentes = data.proyectosDocentes;
        this.state.profesor.publicacionesDocentes = data.publicacionesDocentes;
        this.state.profesor.publicaciones = data.publicaciones;
        this.state.profesor.publicacionesSeguidos = data.publicacionesSeguidos;
        this.state.profesor.horas = data.horas;
        this.state.profesor.urlArchivoHoras = data.urlArchivoHoras;
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
        this.state.profesor.seleccionPublica = data.seleccionPublica;
        this.state.profesor.seleccionPrivada = data.seleccionPrivada;

        });
      } catch (error) {
        console.log(error);
      }
      this.state.registrado = true;
      return this.state.profesor;
    }
  },
  modules: {
  }
})
