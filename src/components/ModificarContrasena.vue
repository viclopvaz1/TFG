<template>
  <div>
    <b-card style="background-color: #f7f5f6; border-radius: 10px">
      <form @submit.prevent="cambiarContrasena">
        <b-form-group label="Contraseña*:" label-for="input-contrasena" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-contrasena" v-model="contrasena" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar Contraseña*:" label-for="input-confirmarContrasena" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-confirmarContrasena" v-model="confirmarContrasena" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>
        <div style="text-align: center">
          <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Cambiar Contraseña</b-button>
        </div>
        
        <b-alert v-model="validarContrasena" dismissible variant="danger" class="mt-3">
          Las contraseñas no coinciden
        </b-alert>

        <b-card-text style="color: #858081">
          *: Los campos con un asterisco son obligatorios.
        </b-card-text>
      </form>
    </b-card>
  </div>
</template>

<style>
    .btn:focus, .btn.focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(199 181 145 / 50%) !important
    }
</style>

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
          this.profesor.confirmarContrasena = this.confirmarContrasena;
          store.dispatch('updateFields');
          this.$router.replace('home');
        }).catch(function(error) {
          console.log(error)
        });

      } else {
          this.validarContrasena = true;
        }
    }
  }
}
</script>

