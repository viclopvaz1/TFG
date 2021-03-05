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

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(2)" variant="primary" :pressed.sync="profesor.seleccionPrivada[2]">Comentarios</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(3)" variant="primary" :pressed.sync="profesor.seleccionPrivada[3]">Publicaciones Seguidos</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(4)" variant="primary" :pressed.sync="profesor.seleccionPrivada[4]">Resumenes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(5)" variant="primary" :pressed.sync="profesor.seleccionPrivada[5]">Horas no validadas</b-button>
            </b-row>

            <b-row style="font-weight: bold; margin-top: 20px">
                Subir
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(6)" variant="primary" :pressed.sync="profesor.seleccionPrivada[6]">Publicaciones Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(7)" variant="primary" :pressed.sync="profesor.seleccionPrivada[7]">Publicaciones</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(8)" variant="primary" :pressed.sync="profesor.seleccionPrivada[8]">Horas</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(9)" variant="primary" :pressed.sync="profesor.seleccionPrivada[9]">Proyectos Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(10)" variant="primary" :pressed.sync="profesor.seleccionPrivada[10]">Cursos Recibidos / Dados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(11)" variant="primary" :pressed.sync="profesor.seleccionPrivada[11]">Trabajos Supervisados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="privada(12)" variant="primary" :pressed.sync="profesor.seleccionPrivada[12]">Estancias Erasmus / Docentes</b-button>
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