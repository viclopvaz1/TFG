<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <form @submit.prevent="subirPublicacionesDocentes">

                <b-form-group label="Titulo:" label-for="input-titulo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-titulo" v-model="publicacionDocente.titulo" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-descripcion" v-model="publicacionDocente.descripcion" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-alert v-model="publicacionDocenteSubida" dismissible variant="success" class="mt-3">
                    Tu Publicación Docente se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Esta Publicación Docente ya se encuentra subido en su perfil.
                </b-alert>

                <div style="text-align: center">
                    <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir Publicaciones Docentes</b-button>
                </div>
                
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
            horaSubido: ''
        },
        publicacionDocenteSubida: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  methods: {
      subirPublicacionesDocentes() {
            this.publicacionDocenteSubida = false;
            this.errorSubida = false;
            var publicacionDocente = this.profesor.publicacionesDocentes.find(element => element.titulo == this.publicacionDocente.titulo && element.descripcion == this.publicacionDocente.descripcion);
            if (publicacionDocente == undefined) {
                var horaSubida = new Date();

                const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}

                this.publicacionDocente.horaSubida = horaSubida.toLocaleDateString('es-ES',options);
                this.profesor.publicacionesDocentes.push(this.publicacionDocente);
                this.update();
                this.publicacionDocenteSubida = true;
                this.publicacionDocente = {
                    titulo: '',
                    descripcion: ''
                }

                if (this.profesor.publicacionesDocentes.length == 3) {
                    this.profesor.puntuacion += 1;
                    this.publicacionesDocentes = 0;
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