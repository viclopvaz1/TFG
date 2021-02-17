<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirCursosDocentes">

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-descripcion" v-model="cursoDocente.descripcion" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Duración:" label-for="input-duracion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-duracion" v-model="cursoDocente.duracion" type="number" min="0" required></b-form-input>
                </b-form-group>

                <b-form-group label="Lugar:" label-for="input-lugar" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-lugar" v-model="cursoDocente.lugar" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo:" label-for="input-tipo" class="mt-2" label-cols-md="2">
                    <b-form-select v-model="cursoDocente.tipo" :options="tipo"></b-form-select>
                </b-form-group>

                <b-alert :show="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Proyecto Docente ya se encuentra subido en su perfil.
                </b-alert>

                <b-button type="submit" variant="primary">Subir Cursos Docentes</b-button>
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
        cursoDocente: {
            descripcion: '',
            duracion: '',
            lugar: '',
            tipo: ''
        },
        tipo: [
                { value: 'Dado', text: 'Dado' },
                { value: 'Recibido', text: 'Recibido' }
            ],
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      subirCursosDocentes() {
            var cursoDocente = this.profesor.estancias.find(element => element.descripcion == this.cursoDocente.descripcion && element.duracion == this.cursoDocente.duracion && element.lugar == this.cursoDocente.lugar && element.tipo == this.cursoDocente.tipo);
            if (cursoDocente == undefined) {
                this.profesor.cursosDocentes.push(this.cursoDocente);
                this.update();
                this.cursoDocente = {
                    descripcion: '',
                    duracion: '',
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