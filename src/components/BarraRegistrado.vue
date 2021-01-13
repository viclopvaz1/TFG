<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-link to="/home">Logo</b-link>

      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <b-dropdown right variant="primary">
        <template #button-content>
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> {{profesor.nombre}}
        </template>
        <b-dropdown-item-button>
          <router-link to="/paginaPrincipal">Pagina Principal</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="/miPerfil">Mi Perfil</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <a href="#" @click="logout">Logout</a>
        </b-dropdown-item-button>
      </b-dropdown>
    </b-navbar>
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
  name: "BarraRegistrado",
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(['getData'])
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
    logout() {
      this.profesor.email = '';
      this.profesor.contrasena = '';
      this.registrado = false;
      localStorage.setItem('userEmail', '');
      localStorage.setItem('userPassword', '');
      localStorage.setItem('userRegistrado', false);
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
  }
};
</script>