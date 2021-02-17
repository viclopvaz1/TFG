<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirHoras">

                <b-form-group label="URL del archivo de horas:" label-for="input-url" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-url" v-model="profesor.urlArchivoHoras" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Institución:" label-for="input-institucion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-institucion" v-model="hora.institucion" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Asignatura:" label-for="input-asignatura" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-asignatura" v-model="hora.asignatura" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Idioma:" label-for="input-idioma" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-idioma" v-model="hora.idioma" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Año:" label-for="input-ano" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-ano" v-model="hora.ano" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Horas:" label-for="input-horas" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-horas" v-model="hora.horas" type="number" min="0" required></b-form-input>
                </b-form-group>
                <b-alert :show="horasSubidas" dismissible variant="success" class="mt-3">
                    Tus horas se han subido y un adminstrador las validará pronto
                </b-alert>
                <b-alert :show="errorSubida" dismissible variant="danger" class="mt-3">
                    Estas horas ya han sido validadas previamente o están pendientes de validación
                </b-alert>

                <b-button type="submit" variant="primary">Subir horas</b-button>
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
  name: "SubirHoras",
  data() {
    return {
        hora: {
            institucion: '',
            asignatura: '',
            idioma: '',
            horas: 0,
            ano: '',
            validada: 0,
            justificacionHora: ""
        },
        horasSubidas: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      subirHoras() {
            var hora = this.profesor.horas.find(element => element.asignatura == this.hora.asignatura && element.ano == this.hora.ano && element.horas == this.hora.horas && element.idioma == this.hora.idioma && element.institucion == this.hora.institucion && (element.validada == 0 || element.validada == 1));
            if (hora == undefined) {
                this.profesor.horas.push(this.hora);
                this.horasSubidas = true;
                this.update();
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