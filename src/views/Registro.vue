<template>
  <div>
    <BarraSinRegistrar/>

    <div class="mt-5 mb-5 col-md-4 text-center mx-auto">
      <b-card>
        <h2>Registro</h2>
        <form @submit.prevent="registrarse">
          <b-form-group label="Nombre:" label-for="input-nombre" class="mt-2">
            <b-form-input id="input-nombre" v-model="profesor.nombre" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group label="Apellidos:" label-for="input-apellidos" class="mt-2">
            <b-form-input id="input-apellidos" v-model="profesor.apellidos" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email:" label-for="input-email" class="mt-2">
            <b-form-input id="input-email" v-model="profesor.email" type="email" required></b-form-input>
            <p v-if="validarCorreo">Este correo ya está registrado</p>
          </b-form-group>

          <b-form-group label="Contraseña:" label-for="input-contraseña" class="mt-2">
            <b-form-input id="input-contraseña" v-model="profesor.contrasena" type="password" required></b-form-input>
            <p v-if="validarContrasena">Las contraseñas no coinciden o miden menos de 6 caracteres</p>
          </b-form-group>

          <b-form-group label="Confirmar Contraseña:" label-for="input-confirmar-contraseña" class="mt-2">
            <b-form-input id="input-confirmar-contraseña" v-model="profesor.confirmarContrasena" type="password" required></b-form-input>
          </b-form-group>

          <b-form-group label="Título proyecto docente:" label-for="input-título-proyecto" class="mt-2">
            <b-form-input id="input-título-proyecto" v-model="proyectoDocente.titulo" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group label="Descripción:" label-for="input-descripción" class="mt-2">
            <b-form-input id="input-descripción" v-model="proyectoDocente.descripcion" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group label="URL al archivo:" label-for="input-url" description="Introduce una URL desde la que podamos descargar el archivo con el proyecto docente." class="mt-2">
            <b-form-input id="input-url" v-model="proyectoDocente.url" type="text" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Registrarse</b-button>
        </form>

        <div>
          <p style="margin-bottom: 0; margin-top: 10px">¿Ya tienes cuenta?</p>
          <router-link to="/login">Iniciar Sesion</router-link>
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields';
import BarraSinRegistrar from '@/components/BarraSinRegistrar.vue'
import {db} from '../main';

export default {
    name: 'Registro',
    components: {
      BarraSinRegistrar
    },
    data() {
      return {
        proyectoDocente: {
          titulo: '',
          descripcion: '',
          url: ''
        },
        validarContrasena: false,
        validarCorreo: false
      }
    },
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    },
    methods: {
      async registrarse() {
        if (this.profesor.contrasena == this.profesor.confirmarContrasena && this.profesor.contrasena.length >= 6) {

          // firebase
          // .auth()
          // .createUserWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
          // .then((user) => {this.$router.replace('home'); this.registrado = true; localStorage.setItem('userEmail', this.profesor.email)},
          // (error) => {console.error(error); this.validarCorreo = true});

          await firebase.auth().createUserWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
          .then((user) => {
            this.$router.replace('home');
            this.registrado = true;
            localStorage.setItem('userEmail', this.profesor.email);
            try {
              this.profesor.proyectosDocentes = [];
              this.profesor.proyectosDocentes.push(this.proyectoDocente);

              db.collection('profesores').add({
                nombre: this.profesor.nombre,
                apellidos: this.profesor.apellidos,
                email: this.profesor.email,
                contrasena: this.profesor.contrasena,
                confirmarContrasena: this.profesor.confirmarContrasena,
                foto: '',
                puntuacion: 0.0,
                centro: '',
                departamento: '',
                despacho: '',
                proyectosDocentes: this.profesor.proyectosDocentes,
                publicacionesDocentes: [],
                publicaciones: [],
                horas: [],
                cursosDocentes: [],
                trabajosSupervisados: [],
                estancias: [],
                correoAlumnos: [],
                descripcion: '',
                seguidos: [],
                seguidores: [],
                comentarios: [],
                twitter: '',
                paginaPersonal: '',
                researchGate: '',
                seleccionPublica: [false, false, false, false, false, false, false, false, false, false],
                seleccionPrivada: [false, false, false, false, false, false, false, false, false, false, false]
              })
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(error);
            console.error(errorCode);
            console.error(errorMessage);
            this.validarCorreo = true;
          });

          console.log(this.validarCorreo);
      
          // try {
          //   this.profesor.proyectosDocentes = [];
          //   this.profesor.proyectosDocentes.push(this.proyectoDocente);

          //   await db.collection('profesores').add({
          //     nombre: this.profesor.nombre,
          //     apellidos: this.profesor.apellidos,
          //     email: this.profesor.email,
          //     contrasena: this.profesor.contrasena,
          //     confirmarContrasena: this.profesor.confirmarContrasena,
          //     foto: '',
          //     puntuacion: 0.0,
          //     centro: '',
          //     departamento: '',
          //     despacho: '',
          //     proyectosDocentes: this.profesor.proyectosDocentes,
          //     publicacionesDocentes: [],
          //     publicaciones: [],
          //     horas: [],
          //     cursosDocentes: [],
          //     trabajosSupervisados: [],
          //     estancias: [],
          //     correoAlumnos: [],
          //     descripcion: '',
          //     seguidos: [],
          //     seguidores: [],
          //     comentarios: [],
          //     twitter: '',
          //     paginaPersonal: '',
          //     researchGate: '',
          //     seleccionPublica: [false, false, false, false, false, false, false, false, false, false],
          //     seleccionPrivada: [false, false, false, false, false, false, false, false, false, false, false]
          //   })
          // } catch (error) {
          //   console.log(error);
          // }
          this.tarjetaProfesor = this.profesor;
          
        } else {
          this.validarContrasena = true;
        }
      }
    }
}
</script>

<style>

</style>