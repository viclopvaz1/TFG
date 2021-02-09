<template>
  <div>
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>
    <b-nav tabs align="center">
    <b-nav-item :active="mostrarProfesores" @click="cambiar()">Profesores</b-nav-item>
    <b-nav-item :active="mostrarPublicaciones" @click="cambiar()">Publicaciones</b-nav-item>
  </b-nav>
    <BusquedaProfesores v-if="mostrarProfesores"/>
    <BusquedaPublicaciones v-if="mostrarPublicaciones"/>
  </div>
</template>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import BusquedaProfesores from '@/components/BusquedaProfesores.vue'
import BusquedaPublicaciones from "@/components/BusquedaPublicaciones.vue";
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
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
    ...mapFields(["profesor", "profesoresDB", "registrado", "administrador", "profesoresBusqueda"]),
  },
  methods: {
    cambiar() {
      this.mostrarProfesores = !this.mostrarProfesores;
      this.mostrarPublicaciones = !this.mostrarPublicaciones;
    }
  }
}
</script>