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
    return {
      administradores: []
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB"]),
    ...mapActions(['getData', 'recuperarState', 'getAdmins']),
   
  },
  async created() {
    try {
      let admins = await store.dispatch("getAdmins");
      this.administradoresDB = admins;
      console.log(this.administradoresDB);

    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     for (var adminKey in this.administradoresDB) {
    //       if (user.email == this.administradoresDB[adminKey].email){
    //           this.$router.replace('validacionHoras');
    //           break;
    //       } else {
    //         store.dispatch("recuperarState", {email: user.email})
    //         this.tarjetaProfesor = this.profesor;
    //       }
    //     }
    //   } 
    // });

    // firebase.auth().onAuthStateChanged(user => {
    //   store.dispatch("getAdmins")
    //   .then(() => {
    //     if (user) {
    //       for (var adminKey in this.administradoresDB) {
    //         if (user.email == this.administradoresDB[adminKey].email){
    //             this.$router.replace('validacionHoras');
    //             break;
    //         } else {
    //           store.dispatch("recuperarState", {email: user.email});
    //           this.tarjetaProfesor = this.profesor;
    //         }
    //       }
    //     }
    //   });
    // })   

    try {
      var notAdmin = true;
              console.log(this.administradoresDB);
      
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
