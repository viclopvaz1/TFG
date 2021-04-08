<template>
    <div style="max-width: fit-content">
        <b-col>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(0)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[0]">Publicaciones Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(1)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[1]">Publicaciones</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(2)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[2]">Horas de Docencia</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(3)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                :pressed.sync="tarjetaProfesor.seleccionPublica[3]">Proyectos Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(4)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[4]">Cursos</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(5)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[5]">Trabajos Supervisados</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(6)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="tarjetaProfesor.seleccionPublica[6]">Estancias</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(7)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[7]">Comentarios</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(8)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available" 
                :pressed.sync="tarjetaProfesor.seleccionPublica[8]">Resumenes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(9)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                :pressed.sync="tarjetaProfesor.seleccionPublica[9]">Seguidos</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="publica(10)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                :pressed.sync="tarjetaProfesor.seleccionPublica[10]">Seguidores</b-button>
            </b-row>
        </b-col>
    </div>
</template>

<style>
    .btn-secondary:not(:disabled):not(.disabled):active:focus,
     .btn-secondary:not(:disabled):not(.disabled).active:focus,
      .show > .btn-secondary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.2rem rgb(199 181 145 / 50%) !important
    }
</style>

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
                    this.tarjetaProfesor.seleccionPublica[value] = true;
                } else {
                    this.tarjetaProfesor.seleccionPublica[i] = false;
                }
            }
            store.dispatch('updateBotones');
      }
  }
};
</script>