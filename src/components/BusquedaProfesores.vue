<template>
  <div>
    <b-card v-for="(profesorB, key) in profesoresBusqueda" :key="key" class="overflow: hidden" style="margin: 20px; background-color: #f7f5f6; border-radius: 10px">
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
                            <b-col style="max-width: fit-content; margin-top: -5px;">
                                <b-button v-if="compruebaNoSiguiendo(profesorB)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="seguir(profesorB)">Seguir</b-button>
                                <b-button v-if="compruebaSiguiendo(profesorB)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="dejarSeguir(profesorB)">Dejar de Seguir</b-button>
                            </b-col>
                            <b-col style="max-width: fit-content">
                                <a :href="profesorB.paginaPersonal" target="_blank" v-if="profesorB.paginaPersonal != ''" style="color: #c7b591">
                                    <b-icon icon="house-fill" class="h4 mb-2"></b-icon>
                                </a>
                                <a :href="profesorB.researchGate" target="_blank" v-if="profesorB.researchGate != ''" style="color: #c7b591">
                                    <b-icon icon="book-fill" class="h4 mb-2" style="margin-left: 15px"></b-icon>
                                </a>
                                <a :href="profesorB.twitter" target="_blank" v-if="profesorB.twitter != ''" style="color: #c7b591">
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
import store from '../store';
import {db} from '../main';

export default {
    name: "BusquedaProfesores",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "profesoresBusqueda", "tarjetaProfesor"]),
  },
  methods: {
    compruebaNoSiguiendo(profesorBuscado) {
      var result = false;
      var profesor = this.profesor.seguidos.find(element => element.email == profesorBuscado.email);
      if (profesorBuscado.email != this.profesor.email && profesor == undefined && firebase.auth().currentUser != null) {
        result = true;
      }
      return result;
    },
    compruebaSiguiendo(profesorBuscado) {
      var result = false;
      var profesor = this.profesor.seguidos.find(element => element.email == profesorBuscado.email);
      if (profesorBuscado.email != this.profesor.email && profesor != undefined && firebase.auth().currentUser != null) {
        result = true;
      }
      return result;
    },
    async seguir(profesorBuscado) {
      var profesor = {
        nombre: profesorBuscado.nombre,
        apellidos: profesorBuscado.apellidos,
        puntuacion: profesorBuscado.puntuacion,
        email: profesorBuscado.email,
        foto: profesorBuscado.foto
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
      profesorBuscado.seguidores.push(seguidor);
      if (profesorBuscado.seguidores.length >= 2 && !profesorBuscado.puntuacionSeguidores) {
        profesorBuscado.puntuacion += 1;
        profesorBuscado.puntuacionSeguidores = true;
      }

      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', profesorBuscado.email.toLowerCase()).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

        p.update( {
            seguidores: profesorBuscado.seguidores,
            puntuacion: profesorBuscado.puntuacion,
            puntuacionSeguidores: profesorBuscado.puntuacionSeguidores
        })
        .then(function() {
            console.log("Document changed");
        })
        .catch(function(error) {
            console.log("Error: " + error);
        })
      } catch (error) {
          console.log(error);
      }
    },
    async dejarSeguir(profesorBuscado) {
      this.profesor.seguidos.splice(this.profesor.seguidos.findIndex(element => element.email == profesorBuscado.email), 1);
      store.dispatch("updateFields");

      profesorBuscado.seguidores.splice(profesorBuscado.seguidores.findIndex(element => element.email == this.profesor.email), 1);
      if (profesorBuscado.seguidores.length < 2 && profesorBuscado.puntuacionSeguidores) {
        profesorBuscado.puntuacion -= 1;
        profesorBuscado.puntuacionSeguidores = false;
      }

      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', profesorBuscado.email.toLowerCase()).get();
        var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

        p.update( {
            seguidores: profesorBuscado.seguidores,
            puntuacion: profesorBuscado.puntuacion,
            puntuacionSeguidores: profesorBuscado.puntuacionSeguidores
        })
        .then(function() {
            console.log("Document changed");
        })
        .catch(function(error) {
            console.log("Error: " + error);
        })
      } catch (error) {
          console.log(error);
      }
    },
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