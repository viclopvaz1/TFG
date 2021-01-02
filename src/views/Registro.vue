<template>
  <div>
    <b-form @submit.prevent="registrarse">
      <b-form-group label="Nombre:" label-for="input-nombre">
        <b-form-input id="input-nombre" v-model="profesor.nombre" type="text" required></b-form-input>
      </b-form-group>

      <b-form-group label="Apellidos:" label-for="input-apellidos">
        <b-form-input id="input-apellidos" v-model="profesor.apellidos" type="text" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email:" label-for="input-email">
        <b-form-input id="input-email" v-model="profesor.email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Contraseña:" label-for="input-contraseña">
        <b-form-input id="input-contraseña" v-model="profesor.contrasena" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Confirmar Contraseña:" label-for="input-confirmar-contraseña">
        <b-form-input id="input-confirmar-contraseña" v-model="profesor.confirmarContrasena" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Título proyecto docente:" label-for="input-título-proyecto">
        <b-form-input id="input-título-proyecto" v-model="proyectoDocente.titulo" type="text" required></b-form-input>
      </b-form-group>

      <b-form-group label="Descripción:" label-for="input-descripción">
        <b-form-input id="input-descripción" v-model="proyectoDocente.descripcion" type="text" required></b-form-input>
      </b-form-group>

      <b-form-group label="URL al archivo:" label-for="input-url" description="Introduce una URL desde la que podamos descargar el archivo con el proyecto docente.">
        <b-form-input id="input-url" v-model="proyectoDocente.url" type="text" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Registrarse</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>

    <div>
        <p>¿Ya tienes cuenta?</p>
        <router-link to="/login">Iniciar Sesion</router-link>
    </div>
    <pre class="m-0"> {{ profesor }} - {{ proyectoDocente }} </pre>
  </div>
</template>

<script>

import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'

// import config from '@/config';

// // Initialize Firebase
// let app = firebase.initializeApp(config);
// let db = app.database();
// let profesoresRef = db.ref('profesores');

export default {
    name: 'Registro',
    data() {
      return {
        proyectoDocente: {
          titulo: '',
          descripcion: '',
          url: ''
        }
      }
    },
    // firebase: {
    //   profesores: profesoresRef
    // },
    computed: {
    ...mapFields(["profesor", "profesoresRef"]),
    },
    methods: {
      registrarse() {
        this.profesor.proyectosDocentes.push(this.proyectoDocente);
        this.profesoresRef.push(this.profesor)
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
        .then((user) => this.$router.replace('home'), (error) => console.error(error));
      }
    }
}
</script>

<style>

</style>