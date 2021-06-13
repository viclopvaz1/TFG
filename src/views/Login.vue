<template>
  <div>
    <BarraSinRegistrar/>

    <div :style="{ backgroundImage: 'url(' + require('@/assets/despacho1.jpg') + ')'}" style="background-size: 100% 100%; position: fixed; height: 100%; width: 100%">
      <b-card style="background-color: #f7f5f6; border-radius: 10px" class="mt-5 mb-5 col-md-4 text-center mx-auto">
        <h2>Inicio de sesión</h2>
        <form @submit.prevent="login">
          <b-form-group id="input-group-1" label="Correo Electrónico" label-for="input-1" class="mt-5" style="color: #858081">
            <b-form-input v-model="emailUsuario" type="email" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
          </b-form-group> 

          <b-form-group id="input-group-2" label="Contraseña" label-for="input-2" style="color: #858081">
            <b-form-input v-model="contrasenaUsuario" type="password" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
            <p v-if="validarLogin">El email o la contraseña son incorrectos</p>
          </b-form-group> 

          <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px"> Acceder </b-button>
        </form>

        <div>
            <p style="margin-bottom: 0; margin-top: 10px">¿No tienes cuenta?</p>
            <router-link to="/registro" style="color:  #c7b591">Regístrate</router-link>
        </div>
      </b-card>
    </div>
  </div>

  
</template>

<script>
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import {db} from '../main';
import store from '../store';

export default {
  name: 'Login',
  components: {
    BarraSinRegistrar
  },
  data() {
    return {
      validarLogin: false,
      emailUsuario: '',
      contrasenaUsuario: ''
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor", "administrador", "administradoresDB"]),
    ...mapActions(['getData', 'getAdmins']),
    
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.replace('home');
      } 
    })

  },
  mounted() {
    store.dispatch('getAdmins');
    store.dispatch('getData');
  },
  methods: {
    async login() {
      var admin = false;
      for (var adminKey in this.administradoresDB) {
        if (this.emailUsuario == this.administradoresDB[adminKey].email && this.contrasenaUsuario == this.administradoresDB[adminKey].contrasena){
          admin = true;
          break;
        }
      }

      if (admin) {
        this.administrador.email = this.emailUsuario;
        this.administrador.contrasena = this.contrasenaUsuario;

        firebase
          .auth()
          .signInWithEmailAndPassword(this.administrador.email, this.administrador.contrasena)
          .then((user) => {this.$router.replace('validacionHoras'); this.registrado = true;},
          (error) => {console.error(error); this.validarLogin = true});

      } else {
        this.profesor.email = this.emailUsuario;
        this.profesor.contrasena = this.contrasenaUsuario;
        try {
          const profesoresRef = await db.collection('profesores').where('email', '==', this.profesor.email).get();
          
          profesoresRef.forEach(doc => {
          let data = doc.data();
          this.profesor.nombre = data.nombre;
          this.profesor.apellidos = data.apellidos;
          this.profesor.confirmarContrasena = data.confirmarContrasena;
          this.profesor.foto = data.foto;
          this.profesor.puntuacion = data.puntuacion;
          this.profesor.puntuacionComentario = data.puntuacionComentario;
          this.profesor.puntuacionSeguidores = data.puntuacionSeguidores;
          this.profesor.centro = data.centro;
          this.profesor.departamento = data.departamento;
          this.profesor.despacho = data.despacho;
          this.profesor.proyectosDocentes = data.proyectosDocentes;
          this.profesor.publicacionesDocentes = data.publicacionesDocentes;
          this.profesor.publicaciones = data.publicaciones;
          this.profesor.publicacionesSeguidos = data.publicacionesSeguidos;
          this.profesor.horas = data.horas;
          this.profesor.urlArchivoHoras = data.urlArchivoHoras;
          this.profesor.cursosDocentes = data.cursosDocentes;
          this.profesor.trabajosSupervisados = data.trabajosSupervisados;
          this.profesor.estancias = data.estancias;
          this.profesor.correoAlumnos = data.correoAlumnos;
          this.profesor.descripcion = data.descripcion;
          this.profesor.seguidos = data.seguidos;
          this.profesor.seguidores = data.seguidores;
          this.profesor.comentarios = data.comentarios;
          this.profesor.twitter = data.twitter;
          this.profesor.paginaPersonal = data.paginaPersonal;
          this.profesor.researchGate = data.researchGate;
          this.profesor.seleccionPublica = [true, false, false, false, false, false, false, false, false, false, false];
          this.profesor.seleccionPrivada = [true, false, false, false, false, false, false, false, false, false, false, false, false];
        
        });
          store.dispatch('updateFields');
        } catch (error) {
          console.log(error);
        }
      
        this.tarjetaProfesor = this.profesor;
        
        firebase
          .auth()
          .signInWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
          .then((user) => {this.$router.replace('home'); this.registrado = true;},
          (error) => {console.error(error); this.validarLogin = true});
      }
    },
  }
}
</script>