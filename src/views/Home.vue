<template>
  <div style="background-color: #dddcdc; padding-bottom: 20px; min-height: 100vh">
    <BarraSinRegistrar v-if="!registrado" />
    <BarraRegistrado v-if="registrado"/>

    <b-card style="background-color: #dddcdc; border: hidden">
      <b-row>
      <b-col md="2"></b-col>
          <b-img :src="require('@/assets/logo_tfg_grande.png')" style="max-width: 100%; height: auto;"></b-img>
      <b-col id="texto" lg="6" md="12" sm="12" style="padding-left: 150px; align-self: center">
          <p>Esta aplicación es la oportunidad de hacer pública tu trayectoria docente. 
            Con esto en mente, la aplicación te permitirá subir tus trabajos docentes, 
            horas impartidas en los distintos centros en los que has estado, cursos privados 
            en empresas, supervisión de diferentes trabajos y otras muchas funciones que podrás 
            encontrar una vez te registres. ¡Pruébalo!
          </p>
          <p>
            ¿Has recibido un correo para valorar a un profesor? Puedes valorarlo desde
            <router-link to="/valoracion" style="color:  #c7b591">aquí</router-link>.
          </p>
      </b-col>
      </b-row>
      
    </b-card>

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
