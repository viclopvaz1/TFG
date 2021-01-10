<template>
  <div>
      <BarraSinRegistrar v-if="!registrado" class="mt-10"/>
      <BarraRegistrado v-if="registrado" class="mt-10"/>

      <b-card :img-src=profesor.foto img-alt="Card image" 
          img-left class="mb-3" rounded="circle" img-height="150" img-width="150"
          border-variant="secondary">
        <b-card-text>
            {{profesor.nombre}}  {{profesor.apellidos}}
        </b-card-text>
      </b-card>

      <pre>
      {{profesor}}
      {{registrado}}
    </pre>
  </div>
</template>

<script>
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import BarraRegistrado from '@/components/BarraRegistrado.vue'
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';

export default {
name: 'PaginaPrincipal',
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