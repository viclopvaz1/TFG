<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <form @submit.prevent="subirTrabajosSupervisados">

                <b-form-group label="Titulo:" label-for="input-titulo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-titulo" v-model="trabajoSupervisado.titulo" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-descripcion" v-model="trabajoSupervisado.descripcion" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Tipo:" label-for="input-tipo" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-tipo" v-model="trabajoSupervisado.tipo" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-alert v-model="trabajoSupervisadoSubido" dismissible variant="success" class="mt-3">
                    Tu Trabajo Supervisado se ha publicado correctamente
                </b-alert>

                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Este Trabajo Supervisado ya se encuentra subido en su perfil.
                </b-alert>
                
                <div style="text-align: center">
                    <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir Trabajos Supervisados</b-button>
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
  name: "SubirTrabajosSupervisados",
  data() {
    return {
        trabajoSupervisado: {
            titulo: '',
            descripcion: '',
            tipo: ''
        },
        trabajoSupervisadoSubido: false,
        errorSubida: false,
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", 'recuperarState'])
  },
  methods: {
      subirTrabajosSupervisados() {
            this.trabajoSupervisadoSubido = false;
            this.errorSubida = false;
            var trabajoSupervisado = this.profesor.trabajosSupervisados.find(element => element.titulo == this.trabajoSupervisado.titulo && element.descripcion == this.trabajoSupervisado.descripcion && element.tipo == this.trabajoSupervisado.tipo);
            if (trabajoSupervisado == undefined) {
                this.profesor.trabajosSupervisados.push(this.trabajoSupervisado);
                this.trabajoSupervisadoSubido = true;
                this.trabajoSupervisado = {
                    titulo: '',
                    descripcion: '',
                    tipo: ''
                }

                if (this.profesor.trabajosSupervisados.length == 3) {
                    this.profesor.puntuacion += 1;
                    this.trabajosSupervisados = 0;
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