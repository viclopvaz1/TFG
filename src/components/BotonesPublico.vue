<template>
    <div style="max-width: fit-content">
        <b-col>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(0)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[0]">Publicaciones Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(1)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[1]">Publicaciones</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(2)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[2]">Horas de Docencia</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(3)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[3]">Proyectos Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(4)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[4]">Cursos Recibidos / Dados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(5)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[5]">Trabajos Supervisados</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(6)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[6]">Estancias Erasmus / Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(7)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[7]">Comentarios</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(8)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[8]">Resumenes</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(9)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[9]">Seguidos</b-button>
            </b-row>

            <b-row style="margin-bottom: 5px">
                <b-button @click="publica(10)" variant="primary" :pressed.sync="tarjetaProfesor.seleccionPublica[10]">Seguidores</b-button>
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
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['updateBotones'])
  },
  methods: {
      publica(value) {
            for (let i = 0; i < this.tarjetaProfesor.seleccionPublica.length; i++) {
                if(i == value) {
                    console.log('entra');
                    this.tarjetaProfesor.seleccionPublica[value] = true;
                    console.log(this.tarjetaProfesor.seleccionPublica[value])
                } else {
                    this.tarjetaProfesor.seleccionPublica[i] = false;
                }
            }
            store.dispatch('updateBotones');
      }
  }
};
</script>