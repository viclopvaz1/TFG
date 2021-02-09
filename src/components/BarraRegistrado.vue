<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-link to="/home">Logo</b-link>

      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="busqueda"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="busquedaProfesoresPublicaciones">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <b-dropdown right variant="primary">
        <template #button-content>
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> {{profesor.nombre}}
        </template>
        <b-dropdown-item to="/paginaPrincipal" variant="primary">Pagina Principal</b-dropdown-item>
        <b-dropdown-item to="/miPerfil" variant="primary">Mi Perfil</b-dropdown-item>
        <b-dropdown-item-button @click="logout" variant="primary">
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
    ...mapFields(["profesor", "profesoresDB", "registrado", "administrador", "profesoresBusqueda", "publicacionesBusqueda", "profesorPublicaciones"]),
    ...mapActions(['getData'])
  },
  data() {
    return {
      busqueda: "",
      profesoresNombre: [],
      profesoresApellidos: []
    }
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
    busquedaProfesoresPublicaciones() {
      this.profesoresNombre = [];
      this.profesoresApellidos = [];
      this.publicaciones = [];
      this.publicacionesDocentes = [];
      for (let prof in this.profesoresDB) {
        this.profesorPublicaciones.nombre = this.profesoresDB[prof].nombre;
        this.profesorPublicaciones.apellidos = this.profesoresDB[prof].apellidos;
        this.profesorPublicaciones.email = this.profesoresDB[prof].email;
        this.profesorPublicaciones.foto = this.profesoresDB[prof].foto;
        this.profesorPublicaciones.publicaciones = [];
        this.profesorPublicaciones.publicacionesDocentes = [];
        if (this.profesoresDB[prof].nombre.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresNombre.push(this.profesoresDB[prof]);
        }
        if (this.profesoresDB[prof].apellidos.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresApellidos.push(this.profesoresDB[prof]);
        }
        for (let publ in this.profesoresDB[prof].publicaciones){
          try {
            if (this.profesoresDB[prof].publicaciones[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              this.profesorPublicaciones.publicaciones.push(this.profesoresDB[prof].publicaciones[publ]);
            }
          } catch (error) {
          }
        }
        if (this.profesorPublicaciones.publicaciones.length > 0){
          this.publicaciones.push(this.profesorPublicaciones);
        }
        for (let publ in this.profesoresDB[prof].publicacionesDocentes) {
          try {
            console.log(this.profesoresDB[prof].publicacionesDocentes[publ].titulo)
            if (this.profesoresDB[prof].publicacionesDocentes[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              this.profesorPublicaciones.publicacionesDocentes.push(this.profesoresDB[prof].publicacionesDocentes[publ]);
            }
          } catch (error) {
          }
        }
        if (this.profesorPublicaciones.publicacionesDocentes.length > 0){
          this.publicacionesDocentes.push(this.profesorPublicaciones);
        }
      }
      this.profesoresBusqueda = [];
      for (let prof in this.profesoresNombre) {
        this.profesoresBusqueda.push(this.profesoresNombre[prof])
      }
      for (let prof in this.profesoresApellidos) {
        this.profesoresBusqueda.push(this.profesoresApellidos[prof])
      }
      this.profesoresBusqueda = this.profesoresBusqueda.filter(this.onlyUnique);

      this.publicacionesBusqueda = [];
      for (let publ in this.publicaciones) {
        this.publicacionesBusqueda.push(this.publicaciones[publ])
      }
      for (let publ in this.publicacionesDocentes) {
        this.publicacionesBusqueda.push(this.publicacionesDocentes[publ])
      }

      this.profesoresBusqueda = this.profesoresBusqueda.filter(this.onlyUnique);

      this.publicacionesBusqueda = this.publicacionesBusqueda.filter(this.onlyUnique);

      this.$router.replace('busqueda');

    },
    onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
    },
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

      this.administrador.email = '';
      this.administrador.contrasena = '';

      this.registrado = false;
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
  }
};
</script>