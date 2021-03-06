<template>
  <div>
    <b-card style="border-color: #17a2b8">
      <form @submit.prevent="cambiarContrasena">
        <b-form-group label="Contraseña:" label-for="input-contrasena" class="mt-2" label-cols-md="2">
          <b-form-input id="input-contrasena" v-model="contrasena" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar Contraseña:" label-for="input-confirmarContrasena" class="mt-2" label-cols-md="2">
          <b-form-input id="input-confirmarContrasena" v-model="confirmarContrasena" type="text" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Cambiar Contraseña</b-button>
        <b-alert :show="validarContrasena" dismissible variant="warning" class="mt-3">
          Las contraseñas no coinciden
        </b-alert>
      </form>
    </b-card>
  </div>
</template>

<script>
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';

export default {
  name: "ModificarContrasena",
  data() {
    return {
      contrasena: '',
      confirmarContrasena: '',
      validarContrasena: false
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
    async cambiarContrasena() {
      if (this.contrasena == this.confirmarContrasena) {

        firebase
        .auth()
        .signInWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)

        firebase
        .auth()
        .currentUser
        .updatePassword(this.contrasena)
        .then(() => {
          console.log('Update successful.');
          this.profesor.contrasena = this.contrasena;
          store.dispatch('updateFields');
          this.$router.replace('home');
        }).catch(function(error) {
          // An error happened.
          console.log(error)
        });

      } else {
          this.validarContrasena = true;
        }
    }
  }
}
</script>

