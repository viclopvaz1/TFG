<template>
  <div style="background-color: #dddcdc; min-height: 100vh; padding-bottom: 20px">
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>
    <b-nav tabs align="center" style="border-color: #372d31">
      <b-nav-item :active="mostrarProfesores" @click="cambiar()">Profesores</b-nav-item>
      <b-nav-item :active="mostrarPublicaciones" @click="cambiar()">Publicaciones</b-nav-item>
    </b-nav>
    <BusquedaProfesores v-if="mostrarProfesores"/>
    <BusquedaPublicaciones v-if="mostrarPublicaciones"/>
  </div>
</template>

<style>
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background-color: #c7b591 !important; border-color: #372d31 !important; border-bottom-color: #c7b591 !important; color: #fff !important
  }
  .nav-tabs .nav-link {
    color: #372d31 !important
  }
  .nav-tabs .nav-link:hover {
    border-color: #372d31 !important
  }
</style>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions } from "vuex";
import BusquedaProfesores from '@/components/BusquedaProfesores.vue'
import BusquedaPublicaciones from "@/components/BusquedaPublicaciones.vue";
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import firebase from 'firebase';
import store from '../store';

export default {
    name: "Busqueda",
    components: {
    BarraSinRegistrar,
    BarraRegistrado,
    BusquedaProfesores,
    BusquedaPublicaciones
  },
  data() {
    return {
      mostrarProfesores: true,
      mostrarPublicaciones: false
    } 
  },
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administrador", "profesoresBusqueda", "administradoresDB"]),
    ...mapActions(['getData', 'recuperarState', 'getAdmins']),
  },
  methods: {
    cambiar() {
      this.mostrarProfesores = !this.mostrarProfesores;
      this.mostrarPublicaciones = !this.mostrarPublicaciones;
    }
  },
    async mounted() {
      try {
        let admins = await store.dispatch("getAdmins");
        this.administradoresDB = admins;
      } catch (error) {
        console.log(error);
      }
    },
    async created() {
      try {
        var notAdmin = true;
        
          if (firebase.auth().currentUser) {
            for (var adminKey in this.administradoresDB) {

              if (firebase.auth().currentUser.email == this.administradoresDB[adminKey].email){
                this.$router.replace('validacionHoras');
                notAdmin = false;
                break;
              }
            }

            if (notAdmin) {
              store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
            }

          }
      } catch (error) {
        console.log(error);
      }
    }
}
</script>