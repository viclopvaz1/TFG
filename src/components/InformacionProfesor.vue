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
            :src="tarjetaProfesor.foto"
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
                  <a :href="tarjetaProfesor.paginaPersonal" target="_blank" v-if="tarjetaProfesor.paginaPersonal != ''">
                    <b-icon icon="house-fill" class="h4 mb-2"></b-icon>
                  </a>
                  <a :href="tarjetaProfesor.researchGate" target="_blank" v-if="tarjetaProfesor.researchGate != ''">
                    <b-icon icon="book-fill" class="h4 mb-2" style="margin-left: 15px"></b-icon>
                  </a>
                  <a :href="tarjetaProfesor.twitter" target="_blank" v-if="tarjetaProfesor.twitter != ''">
                    <b-icon icon="twitter" class="h4 mb-2" style="margin-left: 15px"></b-icon>
                  </a>

                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-card-text>
                    {{ tarjetaProfesor.descripcion }}
                </b-card-text> 
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row style="height: 3rem">
            <b-col>
              <b-row style="justify-content: center"> Publicaciones totales </b-row>
              <b-row style="justify-content: center">
                <b-card-text>
                  {{ tarjetaProfesor.publicacionesDocentes.length + tarjetaProfesor.publicaciones.length}} 
                </b-card-text>
              </b-row>
            </b-col>

            <b-col>
              <b-row style="justify-content: center"> Seguidos </b-row>
              <b-row style="justify-content: center">
                <b-card-text>
                  {{ tarjetaProfesor.seguidos.length}} 
                </b-card-text>
              </b-row>
            </b-col>
            
            <b-col>
              <b-row style="justify-content: center"> Seguidores </b-row>
              <b-row style="justify-content: center">
                <b-card-text>
                  {{ tarjetaProfesor.seguidores.length}} 
                </b-card-text>
              </b-row>
            </b-col>

            <b-col>
              <b-row style="justify-content: center"> Puntuación </b-row>
              <b-row style="justify-content: center">
                <b-card-text>
                 {{ tarjetaProfesor.puntuacion}} 
                </b-card-text>
              </b-row>
            </b-col>

            <b-col>
              <b-row style="justify-content: center"> Comentarios </b-row>
              <b-row style="justify-content: center">
                <b-card-text>
                  {{ tarjetaProfesor.comentarios.length}}
                </b-card-text>
              </b-row>
            </b-col>

          </b-row>
        </b-col>
      </b-row>
    </b-card>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions} from 'vuex';

export default {
  name: "InformacionProfesor",
  computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
  },
  created() {
    this.tarjetaProfesor = this.profesor;
  }
  
};
</script>