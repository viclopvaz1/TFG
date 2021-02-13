<template>
    <div style="text-align: -webkit-center;">
        <b-card v-for="(profesor, key) in mejoresProfesores" :key="key"
            class="overflow: hidden" border-variant="secondary" style="margin: 20px; width: 50%;">
            <b-row no-gutters>
                <b-col md="2">
                    <b-avatar :src="profesor.foto" alt="Foto profesorB" size="3rem" button @click="onClick(profesor)"></b-avatar>
                </b-col>
                <b-col md="10">
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col>
                                    <b-card-text>
                                    {{ profesor.nombre }} {{ profesor.apellidos }} {{ profesor.email }}  
                                    </b-card-text>
                                </b-col>
                                <b-col>
                                    <b-card-text>
                                        Puntuación: {{ profesor.puntuacion}} 
                                    </b-card-text>
                                </b-col>
                                
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
import { mapActions} from 'vuex';
import store from '../store';
import firebase from 'firebase';

export default {
    name: "MejoresProfesores",
    data() {
        return {
            mejoresProfesores: []
        }
    },
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "profesoresBusqueda", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState', 'getAdmins']),
    
  },
  async created() {
        try {
            let profes = await store.dispatch("getData");
            this.profesoresDB = profes;
            this.profesoresDB = this.mejoresProfesoresprofesoresOrdenadosPorPuntuacion();
            this.obtenerMejoresProfesores();
        } catch (error) {
            console.log(error);
        }
      
  },
  async mounted() {
        try {
            let profes = await store.dispatch("getData");
            this.profesoresDB = profes;
            this.profesoresDB = this.mejoresProfesoresprofesoresOrdenadosPorPuntuacion();
            this.obtenerMejoresProfesores();
        } catch (error) {
            console.log(error);
        }
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
      },
      obtenerMejoresProfesores () {
          for (let prof in this.profesoresDB) {
            let profesor = this.profesoresDB[prof];
            if (this.mejoresProfesores.length < 5) {
                this.mejoresProfesores.push(profesor);
            }
          }
      },
      mejoresProfesoresprofesoresOrdenadosPorPuntuacion() {
      function compare(a, b) {
        if (a.puntuacion > b.puntuacion)
          return -1;
        if (a.puntuacion < b.puntuacion)
          return 1;
        return 0;
      }

      return this.profesoresDB.sort(compare);
    }
  }

}
</script>