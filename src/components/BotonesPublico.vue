<template>
    <div style="max-width: fit-content">
        <b-col>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(0)" variant="primary" :pressed.sync="profesor.seleccionPublica[0]">Publicaciones Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(1)" variant="primary" :pressed.sync="profesor.seleccionPublica[1]">Publicaciones</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(2)" variant="primary" :pressed.sync="profesor.seleccionPublica[2]">Horas de Docencia</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(3)" variant="primary" :pressed.sync="profesor.seleccionPublica[3]">Proyectos Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(4)" variant="primary" :pressed.sync="profesor.seleccionPublica[4]">Cursos Recibidos / Dados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(5)" variant="primary" :pressed.sync="profesor.seleccionPublica[5]">Trabajos Supervisados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(6)" variant="primary" :pressed.sync="profesor.seleccionPublica[6]">Estancias Erasmus / Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(7)" variant="primary" :pressed.sync="profesor.seleccionPublica[7]">Comentarios</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(8)" variant="primary" :pressed.sync="profesor.seleccionPublica[8]">Seguidos</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(9)" variant="primary" :pressed.sync="profesor.seleccionPublica[9]">Seguidores</b-button>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions} from 'vuex';
import store from '../store';

export default {
  name: "BotonesPublico",
  computed: {
    ...mapFields(["profesor", "profesoresDB"]),
    ...mapActions(['updateFields'])
  },
  methods: {
      publica(value) {
            for (let i = 0; i < this.profesor.seleccionPublica.length; i++) {
                if(i == value) {
                    this.profesor.seleccionPublica[value] = true;
                } else {
                    this.profesor.seleccionPublica[i] = false;
                }
            }
            store.dispatch('updateFields');
      }
  }
};
</script>