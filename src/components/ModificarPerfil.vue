<template>
  <div>
    <b-card style="border-color: #17a2b8">
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre:" label-for="input-nombre" class="mt-2" label-cols-md="2">
          <b-form-input id="input-nombre" v-model="nombre" type="text" required :maxlength="20"></b-form-input>
        </b-form-group>

        <b-form-group label="Apellidos:" label-for="input-apellidos" class="mt-2" label-cols-md="2">
          <b-form-input id="input-apellidos" v-model="apellidos" type="text" required :maxlength="40"></b-form-input>
        </b-form-group>

        <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2">
          <b-form-textarea id="input-descripcion" v-model="descripcion" type="text" :maxlength="300"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Foto:" label-for="input-foto" class="mt-2" label-cols-md="2">
          <b-form-input id="input-foto" v-model="foto" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group label="Despacho:" label-for="input-despacho" class="mt-2" label-cols-md="2">
          <b-form-input id="input-despacho" v-model="despacho" type="text" :maxlength="12"></b-form-input>
        </b-form-group>

        <b-form-group label="Departamento:" label-for="input-departamento" class="mt-2" label-cols-md="2">
          <b-form-input id="input-departamento" v-model="departamento" type="text" :maxlength="48"></b-form-input>
        </b-form-group>

        <b-form-group label="Centro:" label-for="input-centro" class="mt-2" label-cols-md="2">
          <b-form-input id="input-centro" v-model="centro" type="text" :maxlength="48"></b-form-input>
        </b-form-group>

        <b-form-group label="Página Personal:" label-for="input-paginaPersonal" class="mt-2" label-cols-md="2">
          <b-form-input id="input-paginaPersonal" v-model="paginaPersonal" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Research Gate:" label-for="input-researchGate" class="mt-2" label-cols-md="2">
          <b-form-input id="input-researchGate" v-model="researchGate" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Twitter:" label-for="input-twitter" class="mt-2" label-cols-md="2">
          <b-form-input id="input-twitter" v-model="twitter" type="url"></b-form-input>
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
import firebase from 'firebase';

export default {
  name: "ModificarPerfil",
  data() {
    return {
      nombre: '',
      apellidos: '',
      descripcion: '',
      foto: '',
      despacho: '',
      departamento: '',
      centro: '',
      paginaPersonal: '',
      researchGate: '',
      twitter: ''
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields", "recuperarState"])
  },
  async mounted() {
    this.profesor = await store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
    this.nombre = this.profesor.nombre;
    this.apellidos = this.profesor.apellidos;
    this.descripcion = this.profesor.descripcion;
    this.foto = this.profesor.foto;
    this.despacho = this.profesor.despacho;
    this.departamento = this.profesor.departamento;
    this.centro = this.profesor.centro;
    this.twitter = this.profesor.twitter;
    this.paginaPersonal = this.profesor.paginaPersonal;
    this.researchGate = this.profesor.researchGate;
  },
  methods: {
    guardar() {

      this.profesor.nombre = this.nombre;
      this.profesor.apellidos = this.apellidos;
      this.profesor.descripcion = this.descripcion;
      this.profesor.foto = this.foto;
      this.profesor.despacho = this.despacho;
      this.profesor.departamento = this.departamento;
      this.profesor.centro = this.centro;
      this.profesor.twitter = this.twitter;
      this.profesor.paginaPersonal = this.paginaPersonal;
      this.profesor.researchGate = this.researchGate;

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
        await store.dispatch('updateFields');
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>