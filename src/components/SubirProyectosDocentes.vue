<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <form @submit.prevent="subirProyectosDocentes">

                <b-form-group label="Título*:" label-for="input-titulo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-titulo" v-model="proyectoDocente.titulo" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción*:" label-for="input-descripcion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-textarea id="input-descripcion" v-model="proyectoDocente.descripcion" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-textarea>
                </b-form-group>

                <b-form-group label="URL*:" label-for="input-url" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-url" v-model="proyectoDocente.url" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <div style="text-align: center">
                    <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir Proyectos Docentes</b-button>
                </div>

                <b-alert v-model="proyectoDocenteSubido" dismissible variant="success" class="mt-3">
                    Tu Proyecto Docente se ha publicado correctamente
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

export default {
  name: "SubirProyectosDocentes",
  data() {
    return {
        proyectoDocente: {
            titulo: '',
            descripcion: '',
            url: ''
        },
        proyectoDocenteSubido: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  methods: {
      subirProyectosDocentes() {
            this.proyectoDocenteSubido = false;
            this.errorSubida = false;
            var proyectoDocente = this.profesor.proyectosDocentes.find(element => element.titulo == this.proyectoDocente.titulo && element.descripcion == this.proyectoDocente.descripcion && element.url == this.proyectoDocente.url);
            if (proyectoDocente == undefined) {
                this.profesor.proyectosDocentes.push(this.proyectoDocente);
                this.proyectoDocenteSubido = true;
                this.proyectoDocente = {
                    titulo: '',
                    descripcion: '',
                    url: ''
                }
                if (this.profesor.proyectosDocentes.length == 3) {
                    this.profesor.puntuacion += 1;
                    this.proyectosDocentes = 0;
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