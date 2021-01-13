<template>
    <div>
        <b-card
      class="overflow-hidden"
      border-variant="secondary"
      style="margin: 20px"
    >
      <b-row no-gutters>
        <b-col md="2">
          <b-avatar
            :src="profesor.foto"
            alt="Foto profesor"
            size="10rem"
          ></b-avatar>
        </b-col>
        <b-col md="10">
          <b-row style="height: 7rem">
            <b-col>
              <b-row> {{ profesor.nombre }} {{ profesor.apellidos }} {{ profesor.email }} </b-row>
              <b-row> {{ profesor.descripcion }} </b-row>
            </b-col>
          </b-row>
          <b-row style="height: 3rem">
            <b-col>
              <b-row style="justify-content: center"> Publicaciones totales </b-row>
              <b-row style="justify-content: center"> {{ profesor.publicacionesDocentes.length + profesor.publicaciones.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Seguidos </b-row>
              <b-row style="justify-content: center"> {{ profesor.seguidos.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Seguidores </b-row>
              <b-row style="justify-content: center"> {{ profesor.seguidores.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Puntuación </b-row>
              <b-row style="justify-content: center"> {{ profesor.puntuacion}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Comentarios </b-row>
              <b-row style="justify-content: center"> {{ profesor.comentarios.length}} </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "InformacionProfesor",
  computed: {
    ...mapFields(["profesor", "profesoresDB"]),
  },
};
</script>