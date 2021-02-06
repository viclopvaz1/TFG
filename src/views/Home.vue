<template>
  <div>
    <BarraSinRegistrar v-if="!registrado" />
    <BarraRegistrado v-if="registrado"/>

    <div>
     <p>Esta aplicación es la oportunidad de hacer pública tu trayectoria docente. 
       Con esto en mente, la aplicación te permitirá subir tus trabajos docentes, 
       horas impartidas en los distintos centros en los que has estado, cursos privados 
       en empresas, supervisión de diferentes trabajos y otras muchas funciones que podrás 
       encontrar una vez te registres. ¡Pruebalo!</p>
    </div>

  </div>
  
</template>

<script>
// @ is an alias to /src
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import BarraRegistrado from '@/components/BarraRegistrado.vue'
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';
import firebase from 'firebase';

export default {
  name: 'Home',
  components: {
    BarraSinRegistrar,
    BarraRegistrado
  },
  data () {
    return {}
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB"]),
    ...mapActions(['getData', 'recuperarState']),
   
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        for (var adminKey in this.administradoresDB) {
          if (user.email == this.administradoresDB[adminKey].email){
              this.$router.replace('validacionHoras');
              break;
          } else {
            store.dispatch("recuperarState", {email: user.email})
            this.tarjetaProfesor = this.profesor;
          }
        }
      } else {
        this.profesorPrueba = null;
      }
    });    
  },
}
</script>
