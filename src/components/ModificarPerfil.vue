<template>
  <div>
    <b-card>
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre:" label-for="input-nombre" class="mt-2" label-cols-md="2">
          <b-form-input id="input-nombre" v-model="profesor.nombre" type="text" required :maxlength="20"></b-form-input>
        </b-form-group>

        <b-form-group label="Apellidos:" label-for="input-apellidos" class="mt-2" label-cols-md="2">
          <b-form-input id="input-apellidos" v-model="profesor.apellidos" type="text" required :maxlength="40"></b-form-input>
        </b-form-group>

        <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
          <b-form-textarea id="input-descripcion" v-model="profesor.descripcion" type="text" :maxlength="300"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Foto:" label-for="input-foto" class="mt-2" label-cols-md="2">
          <b-form-input id="input-foto" v-model="profesor.foto" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Despacho:" label-for="input-despacho" class="mt-2" label-cols-md="2">
          <b-form-input id="input-despacho" v-model="profesor.despacho" type="text" :maxlength="12"></b-form-input>
        </b-form-group>

        <b-form-group label="Departamento:" label-for="input-departamento" class="mt-2" label-cols-md="2">
          <b-form-input id="input-departamento" v-model="profesor.departamento" type="text" :maxlength="48"></b-form-input>
        </b-form-group>

        <b-form-group label="Centro:" label-for="input-centro" class="mt-2" label-cols-md="2">
          <b-form-input id="input-centro" v-model="profesor.centro" type="text" :maxlength="48"></b-form-input>
        </b-form-group>

        <b-form-group label="Página Personal:" label-for="input-paginaPersonal" class="mt-2" label-cols-md="2">
          <b-form-input id="input-paginaPersonal" v-model="profesor.paginaPersonal" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Research Gate:" label-for="input-researchGate" class="mt-2" label-cols-md="2">
          <b-form-input id="input-researchGate" v-model="profesor.researchGate" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Twitter:" label-for="input-twitter" class="mt-2" label-cols-md="2">
          <b-form-input id="input-twitter" v-model="profesor.twitter" type="url"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Guardar cambios</b-button>
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
  name: "ModificarPerfil",
  data() {
    return {
      
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
    guardar() {

      this.tarjetaProfesor.nombre = this.profesor.nombre;
      this.tarjetaProfesor.apellidos = this.profesor.apellidos;
      this.tarjetaProfesor.descripcion = this.profesor.descripcion;
      this.tarjetaProfesor.foto = this.profesor.foto;
      this.tarjetaProfesor.despacho = this.profesor.despacho;
      this.tarjetaProfesor.departamento = this.profesor.departamento;
      this.tarjetaProfesor.centro = this.profesor.centro;
      this.tarjetaProfesor.twitter = this.profesor.twitter;
      this.tarjetaProfesor.paginaPersonal = this.profesor.paginaPersonal;
      this.tarjetaProfesor.researchGate = this.profesor.researchGate;

      this.update();
      
    },
    async update(){
      try {
        
        store.dispatch('updateFields');
        //this.updateFields(profesoresRef);
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>