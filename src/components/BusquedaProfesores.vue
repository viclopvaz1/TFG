<template>
  <div>
    <b-card v-for="(profesorB, key) in profesoresBusqueda" :key="key" 
    class="overflow: hidden"
    border-variant="secondary"
    style="margin: 20px">
        <b-row no-gutters>
    <b-col md="2">
        <b-avatar
        :src="profesorB.foto"
        alt="Foto profesorB"
        size="10rem"
        button @click="onClick(profesorB)"
        ></b-avatar>
    </b-col>
    <b-col md="10">
        <b-row style="height: 7rem">
        <b-col>
            <b-row>
            <b-col>
                <b-card-text>
                {{ profesorB.nombre }} {{ profesorB.apellidos }} {{ profesorB.email }}  
                </b-card-text>
            </b-col>
            <b-col>
                <b-card-text>
                {{ profesorB.despacho }} {{profesorB.departamento}} {{profesorB.centro}}
                </b-card-text>
            </b-col>
            <b-col style="max-width: fit-content">
                <a :href="profesorB.paginaPersonal" target="_blank" v-if="profesorB.paginaPersonal != ''">
                <b-icon icon="house-fill" class="h4 mb-2"></b-icon>
                </a>
                <a :href="profesorB.researchGate" target="_blank" v-if="profesorB.researchGate != ''">
                <b-icon icon="book-fill" class="h4 mb-2" style="margin-left: 15px"></b-icon>
                </a>
                <a :href="profesorB.twitter" target="_blank" v-if="profesorB.twitter != ''">
                <b-icon icon="twitter" class="h4 mb-2" style="margin-left: 15px"></b-icon>
                </a>

            </b-col>
            </b-row>
            <b-row>
            <b-col>
                <b-card-text>
                {{ profesorB.descripcion }}
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
                {{ profesorB.publicacionesDocentes.length + profesorB.publicaciones.length}} 
            </b-card-text>
            </b-row>
        </b-col>

        <b-col>
            <b-row style="justify-content: center"> Seguidos </b-row>
            <b-row style="justify-content: center">
            <b-card-text>
                {{ profesorB.seguidos.length}} 
            </b-card-text>
            </b-row>
        </b-col>
        
        <b-col>
            <b-row style="justify-content: center"> Seguidores </b-row>
            <b-row style="justify-content: center">
            <b-card-text>
                {{ profesorB.seguidores.length}} 
            </b-card-text>
            </b-row>
        </b-col>

        <b-col>
            <b-row style="justify-content: center"> Puntuación </b-row>
            <b-row style="justify-content: center">
            <b-card-text>
                {{ profesorB.puntuacion}} 
            </b-card-text>
            </b-row>
        </b-col>

        <b-col>
            <b-row style="justify-content: center"> Comentarios </b-row>
            <b-row style="justify-content: center">
            <b-card-text>
                {{ profesorB.comentarios.length}}
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
import {
  mapFields
} from 'vuex-map-fields'
import firebase from 'firebase';

export default {
    name: "BusquedaProfesores",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "profesoresBusqueda", "tarjetaProfesor"]),
  },
  methods: {
      onClick(profesorB) {
        this.tarjetaProfesor = profesorB;
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