<template>
  <div>
    <b-card>
      <form @submit.prevent="cambiarContrasena">
        <b-form-group label="Contraseña:" label-for="input-contrasena" class="mt-2" label-cols-md="2">
          <b-form-input id="input-contrasena" v-model="contrasena" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar Contraseña:" label-for="input-confirmarContrasena" class="mt-2" label-cols-md="2">
          <b-form-input id="input-confirmarContrasena" v-model="confirmarContrasena" type="text" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Cambiar Contraseña</b-button>
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
import {db} from '../main';
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
        .currentUser
        .updatePassword(this.contrasena).then(function() {
          console.log('Update successful.')
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