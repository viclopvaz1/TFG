<template>
  <div>
    <BarraSinRegistrar class="mt-10"/>
    <a href="#" @click="logout">Logout</a>

    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(profe, p) in profesoresDB" :key="p">
            <td>
              {{profe.nombre}}
            </td>
            <td>
              {{profe.email}}
            </td>
            <td>
              {{profe.contrasena}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pre>
      {{profesoresDB}}
    </pre>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions, mapMutations } from 'vuex';
import store from '../store';


export default {
  name: 'Home',
  components: {
    BarraSinRegistrar
  },
  data () {
    return {}
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB"]),
    ...mapActions(['getData'])
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    },
    
  }
  
}
</script>
