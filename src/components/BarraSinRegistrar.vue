<template>
  <div>
    <b-navbar type="dark" style="background-color: #372d31">
      <b-img :src="require('@/assets/logo_TFG.png')" style="height: 50px; padding: 0" class="btn" @click="redirect"></b-img>

      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="busqueda" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="busquedaProfesoresPublicaciones">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <b-collapse is-nav style="max-width: fit-content">
        <b-navbar-nav>
          <b-button style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="login">Iniciar Sesión</b-button>
          <b-button style="margin-left: 15px; background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="registro">Regístrate</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style>
  .form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #858081 !important;
  opacity: 1;
}
</style>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';

export default {
  name: "BarraSinRegistrar",
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administrador", "profesoresBusqueda", "publicacionesBusqueda"]),
    ...mapActions(['getData'])
  },
  data() {
    return {
      busqueda: "",
      profesoresNombre: [],
      profesoresApellidos: [],
      publicaciones: [],
      publicacionesDocentes: [],
    }
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
    registro() {
      this.$router.replace('registro');
    },
    login() {
      this.$router.replace('login');
    },
    redirect(){
      this.$router.replace('home');
    },
    busquedaProfesoresPublicaciones() {
      this.profesoresNombre = [];
      this.profesoresApellidos = [];
      let profesorPublicaciones = {}
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

        if (this.profesoresPublicacionesDocentes(prof, profesorPublicaciones).publicaciones.length != 0) {
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
    }
  }
};
</script>