<template>
    <div style="max-width: fit-content">
        <b-col>
            <b-row style="font-weight: bold; justify-content: center; color: #372d31">
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
                Mis datos
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(0)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[0]">Modificar Perfil</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(1)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[1]">Cambiar Contraseña</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(2)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[2]">Comentarios</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(3)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[3]">Publicaciones Seguidos</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(4)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[4]">Resumenes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(5)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[5]">Horas no validadas</b-button>
            </b-row>

            <b-row style="font-weight: bold; margin-top: 20px; justify-content: center; color: #372d31">
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
                Subir
                <b-icon icon="arrow-down-short" class="h4 mb-2"></b-icon>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(6)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[6]">Publicaciones Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(7)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[7]">Publicaciones</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(8)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[8]">Horas</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(9)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[9]">Proyectos Docentes</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(10)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[10]">Cursos</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(11)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[11]">Trabajos Supervisados</b-button>
            </b-row>

            <b-row style="margin-bottom: 10px; justify-content: center">
                <b-button @click="privada(12)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; width: -webkit-fill-available"
                 :pressed.sync="profesor.seleccionPrivada[12]">Estancias</b-button>
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