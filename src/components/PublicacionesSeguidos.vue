<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
          <div v-if="profesor.publicacionesSeguidos == 0" style="text-align: center">
            <b-card-text>Ninguno de los profesores que sigues ha hecho alguna publicación.</b-card-text>
          </div>
            <b-card v-for="(profesorB, key) in profesor.publicacionesSeguidos" :key="key" style="margin: 20px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                    <b-avatar :src="profesorB.foto" alt="Foto profesor" size="3rem" style="margin-right: 20px" button @click="onClick(profesorB)"></b-avatar>
                    {{profesorB.nombre}} {{profesorB.apellidos}} 
                    <b-card-text style="margin-left: 20px;">{{parse(profesorB.publicacion.horaSubida)}}</b-card-text>
                </b-row>
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Título</b-card-text>
                </b-row>
                <b-row no-gutters>
                    {{profesorB.publicacion.titulo}}
                </b-row>
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Descripción</b-card-text>
                </b-row>
                <b-row no-gutters>
                    {{profesorB.publicacion.descripcion}}
                </b-row>
                <b-row no-gutters v-if="profesorB.publicacion.url != ''">
                    <b-card-text>
                        <b>URL: </b>
                        Pulse <a :href="profesorB.publicacion.url" target="_blank" style="color:  #c7b591">aquí</a> para acceder.
                    </b-card-text>
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
import moment from 'moment';

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
      },
      parse(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
    
  }
}
</script>