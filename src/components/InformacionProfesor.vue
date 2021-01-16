<template>
    <div>
        <b-card
      class="overflow: hidden"
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
              <b-row>
                <b-col>
                  <b-card-text>
                  {{ tarjetaProfesor.nombre }} {{ tarjetaProfesor.apellidos }} {{ tarjetaProfesor.email }}  
                </b-card-text>
                </b-col>
                <b-col>
                  <b-card-text>
                    {{ tarjetaProfesor.despacho }} {{tarjetaProfesor.departamento}} {{tarjetaProfesor.centro}}
                  </b-card-text>
                </b-col>
                <b-col style="max-width: fit-content">
                  Aquí van los iconos
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-card-text>
                    {{ profesor.descripcion }}
                </b-card-text> 
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row style="height: 3rem">
            <b-col>
              <b-row style="justify-content: center"> Publicaciones totales </b-row>
              <b-row style="justify-content: center"> {{ tarjetaProfesor.publicacionesDocentes.length + tarjetaProfesor.publicaciones.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Seguidos </b-row>
              <b-row style="justify-content: center"> {{ tarjetaProfesor.seguidos.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Seguidores </b-row>
              <b-row style="justify-content: center"> {{ tarjetaProfesor.seguidores.length}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Puntuación </b-row>
              <b-row style="justify-content: center"> {{ tarjetaProfesor.puntuacion}} </b-row>
            </b-col>
            <b-col>
              <b-row style="justify-content: center"> Comentarios </b-row>
              <b-row style="justify-content: center"> {{ tarjetaProfesor.comentarios.length}} </b-row>
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
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
  },
};
</script>