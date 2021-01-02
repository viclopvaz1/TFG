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
          <tr v-for="(profe, p) in profesoresRef" :key="p">
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
      {{profesoresRef}}
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

export default {
  name: 'Home',
  components: {
    BarraSinRegistrar
  },
  computed: {
    ...mapFields(["profesor", "profesoresRef"]),
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => this.$router.replace('login'));
    }
  }
}
</script>
