<template>
  <div>
    <BarraSinRegistrar v-if="!registrado" />
    <BarraRegistrado v-if="registrado"/>

    <div style="margin-left: 150px; margin-right: 150px; margin-top: 15px;">
     <p>Esta aplicación es la oportunidad de hacer pública tu trayectoria docente. 
       Con esto en mente, la aplicación te permitirá subir tus trabajos docentes, 
       horas impartidas en los distintos centros en los que has estado, cursos privados 
       en empresas, supervisión de diferentes trabajos y otras muchas funciones que podrás 
       encontrar una vez te registres. ¡Pruébalo!</p>
    </div>
    <div style="text-align: center">
      <b-img :src="require('@/assets/logo_tfg_grande.png')"></b-img>
    </div>
    

    <h2 style="text-align: -webkit-center">Estos son los mejores profesores</h2>

    <MejoresProfesores/>

  </div>
  
</template>

<script>
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import BarraRegistrado from '@/components/BarraRegistrado.vue'
import MejoresProfesores from '@/components/MejoresProfesores.vue'
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
    BarraRegistrado,
    MejoresProfesores
  },
  data () {
    return {
      administradores: []
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB"]),
    ...mapActions(['getData', 'recuperarState', 'getAdmins']),
    
   
  },
  async mounted() {
    store.dispatch("getData");
    try {
      let admins = await store.dispatch("getAdmins");
      this.administradoresDB = admins;

    } catch (error) {
      console.log(error);
    }
  },
  async created() {
    store.dispatch("getData");
    try {
      var notAdmin = true;
        if (firebase.auth().currentUser) {

          for (var adminKey in this.administradoresDB) {

            if (firebase.auth().currentUser.email == this.administradoresDB[adminKey].email){
              this.$router.replace('validacionHoras');
              notAdmin = false;
              break;
            }
          }

          if (notAdmin) {
            store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
            this.tarjetaProfesor = this.profesor;
          }

        }
    } catch (error) {
      console.log(error);
    }
  },
  
}
</script>
