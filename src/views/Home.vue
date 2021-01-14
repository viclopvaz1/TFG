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
import HelloWorld from '@/components/HelloWorld.vue'
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
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(['getData', 'recuperarState']),
   
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
    console.log(this.profesor);
    console.log(this.registrado);
    console.log(firebase.auth().currentUser);
    this.compruebaUsuarioRegistrado();
    
  },
  methods: {
    compruebaUsuarioRegistrado() {
      let userRegistrado = localStorage.getItem('userRegistrado');
      console.log(userRegistrado);
      if (firebase.auth().currentUser==null){
        localStorage.setItem('userEmail', '');
        localStorage.setItem('userPassword', '');
        firebase.auth().signOut();
    } else if(firebase.auth().currentUser!=null){
        console.log('recuperaState');
        store.dispatch('recuperarState');
    }
    }
  }
  
}
</script>
