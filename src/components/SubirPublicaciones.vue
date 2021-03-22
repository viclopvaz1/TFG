<template>
    <div>
        <b-card style="border-color: #17a2b8">
            <form @submit.prevent="subirPublicaciones">

                <b-form-group label="Titulo:" label-for="input-titulo" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-titulo" v-model="publicacion.titulo" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
                    <b-form-input id="input-descripcion" v-model="publicacion.descripcion" type="text" required></b-form-input>
                </b-form-group>

                <b-alert v-model="publicacionSubida" dismissible variant="success" class="mt-3">
                    Tu Publicación se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Esta Publicación ya se encuentra subido en su perfil.
                </b-alert>

                <b-button type="submit" variant="primary">Subir Publicaciones</b-button>
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
  name: "SubirPublicaciones",
  data() {
    return {
        publicacion: {
            titulo: '',
            descripcion: '',
            horaSubida: ''
        },
        publicacionSubida: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  methods: {
      subirPublicaciones() {
            this.publicacionSubida = false;
            this.errorSubida = false;
            var publicacion = this.profesor.publicaciones.find(element => element.titulo == this.publicacion.titulo && element.descripcion == this.publicacion.descripcion);
            if (publicacion == undefined) {
                var horaSubida = new Date();

                const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}

                this.publicacion.horaSubida = horaSubida.toLocaleDateString('es-ES',options);
                this.profesor.publicaciones.push(this.publicacion);
                this.publicacionSubida = true;
                this.publicacion = {
                    titulo: '',
                    descripcion: ''
                }

                if (this.profesor.publicaciones.length == 3) {
                        this.profesor.puntuacion += 1;
                        this.publicaciones = 0;
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