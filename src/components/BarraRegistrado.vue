<template>
  <div>
    <b-navbar type="dark" style="background-color: #372d31">
      <b-img :src="require('@/assets/logo_TFG.png')" style="height: 50px; padding: 0" class="btn" @click="redirect"></b-img>

      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" v-model="busqueda" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="busquedaProfesoresPublicaciones">Buscar</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <b-dropdown right class="my-dropdown">
        <template #button-content>
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> {{profesor.nombre}}
        </template>
        <b-dropdown-item to="/paginaPrincipal">Página Principal</b-dropdown-item>
        <b-dropdown-item to="/miPerfil">Mi Perfil</b-dropdown-item>
        <b-dropdown-item-button @click="logout">
          Cerrar sesión
        </b-dropdown-item-button>
      </b-dropdown>
      
    </b-navbar>
  </div>
</template>

<style>
  .my-dropdown .dropdown-menu { background-color: #f7f5f6; border-color: #f7f5f6; padding: 0 }
  .my-dropdown .dropdown-menu .dropdown-item { background-color: #f7f5f6; border-color: #f7f5f6; color: #c7b591 }
  .my-dropdown > button { background-color: #c7b591; border-color: #c7b591; border-radius: 20px }
  .btn-secondary.dropdown-toggle {
    background-color: #c7b591 !important; border-color: #c7b591 !important
  }
  .dropdown .dropdown-menu .dropdown-item:active, .dropdown .dropdown-menu .dropdown-item:hover{background-color: #372d31 !important;}
  .form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #858081 !important;
  opacity: 1;
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
  name: "BarraRegistrado",
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administrador", "profesoresBusqueda", "publicacionesBusqueda"]),
    ...mapActions(['getData', 'getData2'])
  },
  data() {
    return {
      busqueda: "",
      profesoresNombre: [],
      profesoresApellidos: [],
    }
  },
  mounted () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
    redirect(){
      this.$router.replace('home');
    },
    busquedaProfesoresPublicaciones() {
      this.profesoresNombre = [];
      this.profesoresApellidos = [];
      let profesorPublicaciones = {}; 
      const publicaciones = [];
      const publicacionesDocentes = [];
      for (let prof in this.profesoresDB) {
        profesorPublicaciones = {
            nombre: '',
            apellidos: '',
            email: '',
            foto: '',
            publicacionesDocentes: [],
            publicaciones: []
          };
        if (this.profesoresDB[prof].nombre.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresNombre.push(this.profesoresDB[prof]);
        }
        if (this.profesoresDB[prof].apellidos.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresApellidos.push(this.profesoresDB[prof]);
        }
        
        if (this.profesoresPublicaciones(prof, profesorPublicaciones).publicaciones.length != 0) {
          publicaciones.push(this.profesoresPublicaciones(prof, profesorPublicaciones));
        }
        if (this.profesoresPublicacionesDocentes(prof, profesorPublicaciones).publicacionesDocentes.length != 0) {
          publicacionesDocentes.push(this.profesoresPublicacionesDocentes(prof, profesorPublicaciones));
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
      for (let publ in publicaciones) {
        this.publicacionesBusqueda.push(publicaciones[publ])
      }
      for (let publ in publicacionesDocentes) {
        this.publicacionesBusqueda.push(publicacionesDocentes[publ])
      }
      this.profesoresBusqueda = this.profesoresBusqueda.filter(this.onlyUnique);
      this.publicacionesBusqueda = this.publicacionesBusqueda.filter(this.onlyUnique);

      this.$router.replace('busqueda');
    },
    onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
    },
    profesoresPublicaciones(prof, profesorPublicaciones) {
      for (let publ in this.profesoresDB[prof].publicaciones){
          try {
            if (this.profesoresDB[prof].publicaciones[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              profesorPublicaciones.publicaciones.push(this.profesoresDB[prof].publicaciones[publ]);
              
            }
          } catch (error) {}
        }
        if (profesorPublicaciones.publicaciones.length > 0){
          profesorPublicaciones.nombre = this.profesoresDB[prof].nombre;
          profesorPublicaciones.apellidos = this.profesoresDB[prof].apellidos;
          profesorPublicaciones.email = this.profesoresDB[prof].email;
          profesorPublicaciones.foto = this.profesoresDB[prof].foto;
        }
        return profesorPublicaciones;
    },
    profesoresPublicacionesDocentes(prof, profesorPublicaciones) {
      for (let publ in this.profesoresDB[prof].publicacionesDocentes) {
          try {
            if (this.profesoresDB[prof].publicacionesDocentes[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              profesorPublicaciones.publicacionesDocentes.push(this.profesoresDB[prof].publicacionesDocentes[publ]);

            }
          } catch (error) {}
        }
        if (profesorPublicaciones.publicacionesDocentes.length > 0){
          profesorPublicaciones.nombre = this.profesoresDB[prof].nombre;
          profesorPublicaciones.apellidos = this.profesoresDB[prof].apellidos;
          profesorPublicaciones.email = this.profesoresDB[prof].email;
          profesorPublicaciones.foto = this.profesoresDB[prof].foto;
        }
        return profesorPublicaciones;
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