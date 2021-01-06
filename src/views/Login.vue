<template>
  <div class="mt-5 col-md-4 text-center mx-auto">
  <b-card>
    <h2>Login</h2>
    <form @submit.prevent="login">
    <b-form-group
        id="input-group-1"
        label="Correo Electronico:"
        label-for="input-1"
        class="mt-5"
      >
        <b-form-input v-model="profesor.email" type="email"></b-form-input>
      </b-form-group> 

      <b-form-group
        id="input-group-2"
        label="Contraseña:"
        label-for="input-2"
      >
        <b-form-input v-model="profesor.contrasena" type="password"></b-form-input>
      </b-form-group> 
        <b-button type="submit"> Acceder </b-button>
    </form>

    <div>
        <p>¿No tienes cuenta?</p>
        <router-link to="/registro">Regístrate</router-link>
    </div>
    <pre>
      {{ profesor.email }} - {{ profesor.contrasena }}
    </pre>
  </b-card>
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
