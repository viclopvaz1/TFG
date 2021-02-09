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

      <b-collapse is-nav style="max-width: fit-content">
        <b-navbar-nav>
          <div style="width: 105px">
            <b-link to="/login">Iniciar Sesion</b-link>
          </div>
          <div>
            <b-link to="/registro">Regístrate</b-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

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
      publicacionesDocentes: []
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
        if (this.profesoresDB[prof].nombre.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresNombre.push(this.profesoresDB[prof]);
        }
        if (this.profesoresDB[prof].apellidos.toLowerCase().includes(this.busqueda.toLowerCase())) {
          this.profesoresApellidos.push(this.profesoresDB[prof]);
        }
        for (let publ in this.profesoresDB[prof].publicaciones){
          try {
            if (this.profesoresDB[prof].publicaciones[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              this.publicaciones.push(this.profesoresDB[prof]);
            }
          } catch (error) {
            
          }
        }
        for (let publ in this.profesoresDB[prof].publicacionesDocentes) {
          try {
            console.log(this.profesoresDB[prof].publicacionesDocentes[publ].titulo)
            if (this.profesoresDB[prof].publicacionesDocentes[publ].titulo.toLowerCase().includes(this.busqueda.toLowerCase())) {
              this.publicacionesDocentes.push(this.profesoresDB[prof]);
            }
          } catch (error) {
            
          }
          
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
  }
};
</script>

<style></style>
