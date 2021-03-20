<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirCursosDocentes">

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-descripcion" v-model="cursoDocente.descripcion" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Duración:" label-for="input-duracion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-duracion" v-model.number="cursoDocente.duracion" type="number" min="1" required></b-form-input>
                </b-form-group>

                <b-form-group label="Lugar:" label-for="input-lugar" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-lugar" v-model="cursoDocente.lugar" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo:" label-for="input-tipo" class="mt-2" label-cols-md="2">
                    <b-form-select v-model="cursoDocente.tipo" :options="tipo"></b-form-select>
                </b-form-group>

                <b-alert v-model="cursoSubido" dismissible variant="success" class="mt-3">
                    Tu Curso se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Curso ya se encuentra subido en su perfil.
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
import firebase from 'firebase';

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
        cursoSubido: false,
        errorSubida: false,
        cursosDocentesDados: 3,
        cursosDocentesRecibidos: 3
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  async mounted() {
      this.profesor = await store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
      if (this.profesor.cursosDocentes.filter(element => element.tipo == "Dado").length >= 3) {
          this.cursosDocentesDados = 0;
      }
      if (this.profesor.cursosDocentes.filter(element => element.tipo == "Recibido").length >= 3) {
          this.cursosDocentesRecibidos = 0;
      }
  },
  methods: {
      subirCursosDocentes() {
            this.cursoSubido = false;
            this.errorSubida = false;
            var cursoDocente = this.profesor.cursosDocentes.find(element => element.descripcion == this.cursoDocente.descripcion && element.duracion == this.cursoDocente.duracion && element.lugar == this.cursoDocente.lugar && element.tipo == this.cursoDocente.tipo);
            if (cursoDocente == undefined) {
                this.profesor.cursosDocentes.push(this.cursoDocente);
                
                this.cursoSubido = true;
                this.cursoDocente = {
                    descripcion: '',
                    duracion: '',
                    lugar: '',
                    tipo: ''
                }
                if (this.profesor.cursosDocentes.filter(element => element.tipo == "Dado").length == this.cursosDocentesDados) {
                    this.profesor.puntuacion += 0.5;
                    this.cursosDocentesDados = 0;
                } 

                if (this.profesor.cursosDocentes.filter(element => element.tipo == "Recibido").length == this.cursosDocentesRecibidos) {
                    this.profesor.puntuacion += 0.5;
                    this.cursosDocentesRecibidos = 0;
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