<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirPublicacionesDocentes">

                <b-form-group label="Titulo:" label-for="input-titulo" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-titulo" v-model="publicacionDocente.titulo" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-descripcion" v-model="publicacionDocente.descripcion" type="text" required></b-form-input>
                </b-form-group>

                <b-alert :show="errorSubida" dismissible variant="danger" class="mt-3">
                    Esta Publicación Docente ya se encuentra subido en su perfil.
                </b-alert>

                <b-button type="submit" variant="primary">Subir Publicaciones Docentes</b-button>
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
  name: "SubirPublicacionesDocentes",
  data() {
    return {
        publicacionDocente: {
            titulo: '',
            descripcion: '',
        },
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      subirPublicacionesDocentes() {
            var publicacionDocente = this.profesor.publicacionesDocentes.find(element => element.titulo == this.publicacionDocente.titulo && element.descripcion == this.publicacionDocente.descripcion);
            if (publicacionDocente == undefined) {
                this.profesor.publicacionesDocentes.push(this.publicacionDocente);
                this.update();
                this.publicacionDocente = {
                    titulo: '',
                    descripcion: ''
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