<template>
    <div>
        <b-card
      class="overflow: hidden"
      style="margin: 20px; border-color: #17a2b8"
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
                <b-col style="max-width: fit-content; margin-top: -5px;">
                  <b-button v-if="compruebaNoSiguiendo()" variant="primary" @click="seguir()">Seguir</b-button>
                  <b-button v-if="compruebaSiguiendo()" variant="primary" @click="dejarSeguir()">Dejar de Seguir</b-button>
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
import store from '../store';
import firebase from 'firebase';

export default {
  name: "InformacionProfesor",
  computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState', 'updateFields','updateSeguidores']),
  },
  methods: {
    compruebaNoSiguiendo() {
      var result = false;
      var profesor = this.profesor.seguidos.find(element => element.email == this.tarjetaProfesor.email);
      if (this.tarjetaProfesor.email != this.profesor.email && profesor == undefined && firebase.auth().currentUser != null) {
        result = true;
      }
      return result;
    },
    compruebaSiguiendo() {
      var result = false;
      var profesor = this.profesor.seguidos.find(element => element.email == this.tarjetaProfesor.email);
      if (this.tarjetaProfesor.email != this.profesor.email && profesor != undefined && firebase.auth().currentUser != null) {
        result = true;
      }
      return result;
    },
    seguir() {
      var profesor = {
        nombre: this.tarjetaProfesor.nombre,
        apellidos: this.tarjetaProfesor.apellidos,
        puntuacion: this.tarjetaProfesor.puntuacion,
        email: this.tarjetaProfesor.email,
        foto: this.tarjetaProfesor.foto
      };
      this.profesor.seguidos.push(profesor);
      store.dispatch("updateFields");

      var seguidor = {
        nombre: this.profesor.nombre,
        apellidos: this.profesor.apellidos,
        puntuacion: this.profesor.puntuacion,
        email: this.profesor.email,
        foto: this.profesor.foto
      };
      this.tarjetaProfesor.seguidores.push(seguidor);
      if (this.tarjetaProfesor.seguidores.length >= 2 && !this.tarjetaProfesor.puntuacionSeguidores) {
        this.tarjetaProfesor.puntuacion += 1;
        this.tarjetaProfesor.puntuacionSeguidores = true;
      }
      store.dispatch("updateSeguidores");
    },
    dejarSeguir() {
      this.profesor.seguidos.splice(this.profesor.seguidos.findIndex(element => element.email == this.tarjetaProfesor.email), 1);
      store.dispatch("updateFields");

      this.tarjetaProfesor.seguidores.splice(this.tarjetaProfesor.seguidores.findIndex(element => element.email == this.profesor.email), 1);
      if (this.tarjetaProfesor.seguidores.length < 2 && this.tarjetaProfesor.puntuacionSeguidores) {
        this.tarjetaProfesor.puntuacion -= 1;
        this.tarjetaProfesor.puntuacionSeguidores = false;
      }
      store.dispatch("updateSeguidores");
    }
  }
  
};
</script>