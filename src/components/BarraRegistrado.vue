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
          <router-link to="/paginaPrincipal" tag="b-dropdown-item-button">Pagina Principal</router-link>
        <router-link to="/miPerfil" tag="b-dropdown-item-button">Mi Perfil</router-link>
        <b-dropdown-item-button @click="logout">
          Logout
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
      
      this.profesor.nombre = '';
      this.profesor.apellidos = '';
      this.profesor.confirmarContrasena = '';
      this.profesor.foto = '';
      this.profesor.puntuacion = 0.0;
      this.profesor.centro = '';
      this.profesor.departamento = '';
      this.profesor.despacho = '';
      this.profesor.proyectosDocentes = [];
      this.profesor.publicacionesDocentes = [];
      this.profesor.publicaciones = [];
      this.profesor.horas = [];
      this.profesor.cursosDocentes = [];
      this.profesor.trabajosSupervisados = [];
      this.profesor.estancias = [];
      this.profesor.correoAlumnos = [];
      this.profesor.descripcion = '';
      this.profesor.seguidos = [];
      this.profesor.seguidores = [];
      this.profesor.comentarios = [];
      this.profesor.twitter = '';
      this.profesor.paginaPersonal = '';
      this.profesor.researchGate = '';
      this.profesor.seleccionPublica = [];
      this.profesor.seleccionPrivada = [];

      this.registrado = false;
      localStorage.setItem('userEmail', '');
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
  }
};
</script>