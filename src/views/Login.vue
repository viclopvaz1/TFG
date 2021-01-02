<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <b-form-input v-model="profesor.email" type="email" placeholder="Email"></b-form-input>
      <b-form-input v-model="profesor.contrasena" type="password" placeholder="Contraseña"></b-form-input>
      <b-button type="submit"> Acceder </b-button>
    </form>

    <div>
        <p>¿No tienes cuenta?</p>
        <router-link to="/registro">Regístrate</router-link>
    </div>
    <pre>
      {{ profesor.email }} - {{ profesor.contrasena }}
    </pre>
  </div>
</template>

<script>
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'

export default {
  name: 'Login',
  data() {
    return {}
  },
  computed: {
    ...mapFields(["profesor"]),
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
        .then((user) => this.$router.replace('home'), (error) => console.error(error));
    },
  },
};
</script>

<style></style>
