<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <form @submit.prevent="subirCursosDocentes">

                <b-form-group label="Descripción*:" label-for="input-descripcion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-textarea id="input-descripcion" v-model="cursoDocente.descripcion" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-textarea>
                </b-form-group>

                <b-form-group label="Duración*:" label-for="input-duracion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-duracion" v-model.number="cursoDocente.duracion" type="number" min="1" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Lugar*:" label-for="input-lugar" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-lugar" v-model="cursoDocente.lugar" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo*:" label-for="input-tipo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-select v-model="cursoDocente.tipo" :options="tipo" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-select>
                </b-form-group>

                <div style="text-align: center">
                    <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir Cursos Docentes</b-button>
                </div>

                <b-alert v-model="cursoSubido" dismissible variant="success" class="mt-3">
                    Tu Curso se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Curso ya se encuentra subido en su perfil.
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