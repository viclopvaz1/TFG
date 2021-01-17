<template>
    <div style="max-width: fit-content">
        <b-col>
            <b-row style="font-weight: bold">
                Mis datos
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
            </b-row>
            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(0)" variant="primary" :pressed.sync="profesor.seleccionPrivada[0]">Modificar Perfil</b-button>
            </b-row>
            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(1)" variant="primary" :pressed.sync="profesor.seleccionPrivada[1]">Cambiar Contraseña</b-button>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions} from 'vuex';
import store from '../store';

export default {
  name: "BotonesPrivado",
  computed: {
    ...mapFields(["profesor", "profesoresDB"]),
    ...mapActions(['updateFields'])
  },
  methods: {
      privada(value) {
            for (let i = 0; i < this.profesor.seleccionPrivada.length; i++) {
                if(i == value) {
                    this.profesor.seleccionPrivada[value] = true;
                } else {
                    this.profesor.seleccionPrivada[i] = false;
                }
            }
            store.dispatch('updateFields');
      }
  }
};
</script>