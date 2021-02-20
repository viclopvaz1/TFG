<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirProyectosDocentes">

                <b-form-group label="Titulo:" label-for="input-titulo" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-titulo" v-model="proyectoDocente.titulo" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-descripcion" v-model="proyectoDocente.descripcion" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="URL:" label-for="input-url" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-url" v-model="proyectoDocente.url" type="text" required></b-form-input>
                </b-form-group>

                <b-alert :show="proyectoDocenteSubido" dismissible variant="success" class="mt-3">
                    Tu Proyecto Docente se ha publicado correctamente
                </b-alert>

                <b-alert :show="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Proyecto Docente ya se encuentra subido en su perfil.
                </b-alert>

                <b-button type="submit" variant="primary">Subir Proyectos Docentes</b-button>
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
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      subirProyectosDocentes() {
            this.proyectoDocenteSubido = false;
            this.errorSubida = false;
            var proyectoDocente = this.profesor.proyectosDocentes.find(element => element.titulo == this.proyectoDocente.titulo && element.descripcion == this.proyectoDocente.descripcion && element.url == this.proyectoDocente.url);
            if (proyectoDocente == undefined) {
                this.profesor.proyectosDocentes.push(this.proyectoDocente);
                this.update();
                this.proyectoDocenteSubido = true;
                this.proyectoDocente = {
                    titulo: '',
                    descripcion: '',
                    url: ''
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