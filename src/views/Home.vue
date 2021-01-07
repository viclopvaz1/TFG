<template>
  <div>
    <BarraSinRegistrar v-if="!registrado" class="mt-10"/>
    <BarraRegistrado v-if="registrado" class="mt-10"/>

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
          <tr>
            <td>
              {{profesor.nombre}}
            </td>
            <td>
              {{profesor.email}}
            </td>
            <td>
              {{profesor.contrasena}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pre>
      {{profesor}}
      {{registrado}}
    </pre>
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
    ...mapActions(['getData'])
  },
  created () {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch('getData');
    //store.dispatch('updateFields');
  },
  methods: {
    
  }
  
}
</script>
