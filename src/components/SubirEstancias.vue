<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirEstancias">

                <b-form-group label="Asignatura:" label-for="input-asignatura" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-asignatura" v-model="estancia.asignatura" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Duración:" label-for="input-duracion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-duracion" v-model="estancia.duracion" type="number" min="0" required></b-form-input>
                </b-form-group>

                <b-form-group label="Idioma:" label-for="input-idioma" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-idioma" v-model="estancia.idioma" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Lugar:" label-for="input-lugar" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-lugar" v-model="estancia.lugar" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo:" label-for="input-tipo" class="mt-2" label-cols-md="2">
                    <b-form-select v-model="estancia.tipo" :options="tipo"></b-form-select>
                </b-form-group>

                <b-alert :show="estanciaSubida" dismissible variant="success" class="mt-3">
                    Tu Estancia se ha publicado correctamente
                </b-alert>

                <b-alert :show="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Proyecto Docente ya se encuentra subido en su perfil.
                </b-alert>

                <b-button type="submit" variant="primary">Subir Estancias</b-button>
            </form>
        </b-card>
    </div>
</template>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';

export default {
  name: "SubirEstancias",
  data() {
    return {
        estancia: {
            asignatura: '',
            duracion: '',
            idioma: '',
            lugar: '',
            tipo: ''
        },
        tipo: [
                { value: 'Erasmus', text: 'Erasmus' },
                { value: 'Docente', text: 'Docente' }
            ],
        estanciaSubida: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      subirEstancias() {
            this.estanciaSubida = false;
            this.errorSubida = false;
            var estancia = this.profesor.estancias.find(element => element.asignatura == this.estancia.asignatura && element.duracion == this.estancia.duracion && element.idioma == this.estancia.idioma && element.lugar == this.estancia.lugar && element.tipo == this.estancia.tipo);
            if (estancia == undefined) {
                this.profesor.estancias.push(this.estancia);
                this.update();
                this.estanciaSubida = true;
                this.estancia = {
                    asignatura: '',
                    duracion: '',
                    idioma: '',
                    lugar: '',
                    tipo: ''
                }

            } else {
                this.errorSubida = true
            }
          
      },
      async update(){
        try {
            store.dispatch('updateFields');
        } catch (error) {
            console.log(error)
        }
    }
  }
}
</script>