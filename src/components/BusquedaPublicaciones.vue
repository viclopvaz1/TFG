<template>
  <div>
        <b-card v-for="(profesorB, key) in publicacionesBusqueda" :key="key" style="margin: 20px; border-color: #17a2b8">
            <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                <b-avatar :src="profesorB.foto" alt="Foto profesor" size="3rem" style="margin-right: 20px" button @click="onClick(profesorB)"></b-avatar>
                {{profesorB.nombre}} {{profesorB.apellidos}} {{profesorB.email}}
            </b-row>
            <h5 v-if="profesorB.publicaciones.length > 0">Publicaciones</h5>
            <b-card v-for="(publicacion, keyPublicacion) in profesorB.publicaciones" :key="keyPublicacion" style="border-color: #17a2b8">
                <b-row no-gutters>
                    {{publicacion.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{publicacion.descripcion}}
                </b-row>
            </b-card>

            <h5 v-if="profesorB.publicacionesDocentes.length > 0">Publicaciones Docentes</h5>
            <b-card v-for="(publicacionDocente, keyPublicacionDocente) in profesorB.publicacionesDocentes" :key="keyPublicacionDocente" style="border-color: #17a2b8">
                <b-row no-gutters>
                    {{publicacionDocente.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{publicacionDocente.descripcion}}
                </b-row>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import firebase from 'firebase';

export default {
    name: "BusquedaPublicaciones",
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
        if (firebase.auth().currentUser != null && firebase.auth().currentUser.email == profesorB.email){
            this.$router.replace('paginaPrincipal');
        } else {
            this.$router.replace('perfilBuscado');
        }
      }
  }
}
</script>