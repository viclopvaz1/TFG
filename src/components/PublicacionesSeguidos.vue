<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block; border-color: #17a2b8">
            <b-card v-for="(profesorB, key) in profesor.publicacionesSeguidos" :key="key" style="margin: 20px; border-color: #17a2b8">
                <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                    <b-avatar :src="profesorB.foto" alt="Foto profesor" size="3rem" style="margin-right: 20px" button @click="onClick(profesorB)"></b-avatar>
                    {{profesorB.nombre}} {{profesorB.apellidos}} 
                    <b-card-text style="margin-left: 20px;">{{profesorB.publicacion.horaSubida}}</b-card-text>
                </b-row>
                <b-row no-gutters>
                    {{profesorB.publicacion.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{profesorB.publicacion.descripcion}}
                </b-row>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import store from '../store';

export default {
name: "PublicacionesSeguidos",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "publicacionesBusqueda", "tarjetaProfesor"]),
  },
  mounted () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
      onClick(profesorB) {
        this.tarjetaProfesor = this.profesoresDB.find(element => element.email === profesorB.email);
        localStorage.setItem('profesorBuscado', profesorB.email);
        this.$router.replace('perfilBuscado');
      }
  }
}
</script>