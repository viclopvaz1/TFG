<template>
  <div>
      <!-- <pre> {{publicacionesBusqueda}} </pre> -->
        <b-card v-for="(profesor, key) in publicacionesBusqueda" :key="key" style="margin-bottom: 5px">
            <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                <b-avatar
                    :src="profesor.foto"
                    alt="Foto profesor"
                    size="3rem"
                    style="margin-right: 20px"
                    button @click="onClick(profesor)">
                </b-avatar>
                {{profesor.nombre}} {{profesor.apellidos}} {{profesor.email}}
            </b-row>
            <h5 v-if="profesor.publicaciones.length > 0">Publicaciones</h5>
            <b-card v-for="(publicacion, keyPublicacion) in profesor.publicaciones" :key="keyPublicacion">
                <b-row no-gutters>
                    {{publicacion.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{publicacion.descripcion}}
                </b-row>
            </b-card>

            <h5 v-if="profesor.publicacionesDocentes.length > 0">Publicaciones Docentes</h5>
            <b-card v-for="(publicacionDocente, keyPublicacionDocente) in profesor.publicacionesDocentes" :key="keyPublicacionDocente">
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
export default {
    name: "BusquedaPublicaciones",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "publicacionesBusqueda", "tarjetaProfesor"]),
  },
  methods: {
      onClick(profesor) {
        this.tarjetaProfesor = profesor;
        localStorage.setItem('profesorBuscado', profesor.email);
        this.$router.replace('perfilBuscado');
      }
  }
}
</script>