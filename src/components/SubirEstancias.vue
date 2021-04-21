<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <form @submit.prevent="subirEstancias">

                <b-form-group label="Asignatura*:" label-for="input-asignatura" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-asignatura" v-model="estancia.asignatura" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Duración (en días)*:" label-for="input-duracion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-duracion" v-model.number="estancia.duracion" type="number" min="0" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Idioma*:" label-for="input-idioma" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-idioma" v-model="estancia.idioma" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Lugar*:" label-for="input-lugar" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-lugar" v-model="estancia.lugar" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo*:" label-for="input-tipo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-select v-model="estancia.tipo" :options="tipo" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-select>
                </b-form-group>

                <div style="text-align: center">
                    <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir Estancias</b-button>
                </div>

                <b-alert v-model="estanciaSubida" dismissible variant="success" class="mt-3">
                    Tu Estancia se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Proyecto Docente ya se encuentra subido en su perfil.
                </b-alert>
                
                <b-card-text style="color: #858081">
                    *: Los campos con un asterisco son obligatorios.
                </b-card-text>
            </form>
        </b-card>
    </div>
</template>

<style>
    .btn:focus, .btn.focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(199 181 145 / 50%) !important
    }
</style>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';
import firebase from 'firebase';

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
        estanciaDocentes: 3,
        estanciaErasmus: 3
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  async mounted() {
      this.profesor = await store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
      if (this.profesor.estancias.filter(element => element.tipo == "Docente").length >= 3) {
          this.estanciaDocentes = 0;
      }
      if (this.profesor.estancias.filter(element => element.tipo == "Erasmus").length >= 3) {
          this.estanciaErasmus = 0;
      }
  },
  methods: {
      subirEstancias() {
            this.estanciaSubida = false;
            this.errorSubida = false;
            var estancia = this.profesor.estancias.find(element => element.asignatura == this.estancia.asignatura && element.duracion == this.estancia.duracion && element.idioma == this.estancia.idioma && element.lugar == this.estancia.lugar && element.tipo == this.estancia.tipo);
            if (estancia == undefined) {
                this.profesor.estancias.push(this.estancia);
                this.estanciaSubida = true;
                this.estancia = {
                    asignatura: '',
                    duracion: '',
                    idioma: '',
                    lugar: '',
                    tipo: ''
                }
                if (this.profesor.estancias.filter(element => element.tipo == "Docente").length == this.estanciaDocentes) {
                    this.profesor.puntuacion += 0.5;
                    this.estanciaDocentes = 0;
                } 

                if (this.profesor.estancias.filter(element => element.tipo == "Erasmus").length == this.estanciaErasmus) {
                    this.profesor.puntuacion += 0.5;
                    this.estanciaErasmus = 0;
                } 

                this.update();

            } else {
                this.errorSubida = true
            }
          
      },
      async update(){
        try {
            await store.dispatch('updateFields');
        } catch (error) {
            console.log(error)
        }
    }
  }
}
</script>