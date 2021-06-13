<template>
  <div>
    <b-card style="background-color: #f7f5f6; border-radius: 10px">
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre*:" label-for="input-nombre" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-nombre" v-model="nombre" type="text" required :maxlength="20" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Apellidos*:" label-for="input-apellidos" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-apellidos" v-model="apellidos" type="text" required :maxlength="40" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Descripción:" label-for="input-descripcion" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-textarea id="input-descripcion" v-model="descripcion" type="text" :maxlength="300" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-textarea>
        </b-form-group>

        <b-form-group label="Foto:" label-for="input-foto" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-file id="input-foto" ref="foto" placeholder="Sube tu imagen en formato jpg o png" 
            drop-placeholder="Arrastra tu imagen aquí..." :disabled="loading"
            accept="image/jpg, image/png"
            style="background-color: #fffcf5; border-color: #9d9d9d">
          </b-form-file>
        </b-form-group>

        <b-form-group label="Despacho:" label-for="input-despacho" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-despacho" v-model="despacho" type="text" :maxlength="12" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Departamento:" label-for="input-departamento" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-departamento" v-model="departamento" type="text" :maxlength="48" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Centro:" label-for="input-centro" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-centro" v-model="centro" type="text" :maxlength="48" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Página Personal:" label-for="input-paginaPersonal" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-paginaPersonal" v-model="paginaPersonal" type="url" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Research Gate:" label-for="input-researchGate" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-researchGate" v-model="researchGate" type="url" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Twitter:" label-for="input-twitter" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-twitter" v-model="twitter" type="url" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <div style="text-align: center">
          <b-button type="submit" :disabled="loading" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Guardar cambios</b-button>
        </div>

        <b-alert v-model="perfilModificado" dismissible variant="success" class="mt-3">
            Cambios guardados
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
  .custom-file-label {
        background-color: #fffcf5 !important; 
        border-color: #9d9d9d !important
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
  name: "ModificarPerfil",
  data() {
    return {
      nombre: '',
      apellidos: '',
      descripcion: '',
      foto: '',
      loading: false,
      despacho: '',
      departamento: '',
      centro: '',
      paginaPersonal: '',
      researchGate: '',
      twitter: '',
      perfilModificado: false,
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
    async guardar() {

      this.profesor.nombre = this.nombre;
      this.profesor.apellidos = this.apellidos;
      this.profesor.descripcion = this.descripcion;
      this.profesor.despacho = this.despacho;
      this.profesor.departamento = this.departamento;
      this.profesor.centro = this.centro;
      this.profesor.twitter = this.twitter;
      this.profesor.paginaPersonal = this.paginaPersonal;
      this.profesor.researchGate = this.researchGate;

      this.tarjetaProfesor.nombre = this.profesor.nombre;
      this.tarjetaProfesor.apellidos = this.profesor.apellidos;
      this.tarjetaProfesor.descripcion = this.profesor.descripcion;
      this.tarjetaProfesor.despacho = this.profesor.despacho;
      this.tarjetaProfesor.departamento = this.profesor.departamento;
      this.tarjetaProfesor.centro = this.profesor.centro;
      this.tarjetaProfesor.twitter = this.profesor.twitter;
      this.tarjetaProfesor.paginaPersonal = this.profesor.paginaPersonal;
      this.tarjetaProfesor.researchGate = this.profesor.researchGate;

      try {
        const { files } = this.$refs.foto;
        this.loading = true;
        const file = files[0];
        if (file) {
          const isJpg = file.type === 'image/jpg';
          const isPng = file.type === 'image/png';
          if (isJpg || isPng) {
            const response = await firebase
              .storage()
              .ref(`${this.profesor.email}/foto`)
              .put(file);
            const url = await response.ref.getDownloadURL();
            this.profesor.foto = url;
            this.tarjetaProfesor.foto = url;
          } else {
            console.log('Archivo no valido');
          }
        } else {
          console.log('falta el archivo');
        }
      } catch (error) {
        console.error(error);
      }
      this.loading = false;

      this.perfilModificado = true;

      try {
        await store.dispatch('updateFields');
      } catch (error) {
        console.log(error)
      }
    }
      
    },
  
}
</script>