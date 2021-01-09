<template>
  <div>
    <BarraSinRegistrar class="mt-10"/>

    <div class="mt-5 mb-5 col-md-4 text-center mx-auto">
      <b-card>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <b-form-group
            id="input-group-1"
            label="Correo Electronico"
            label-for="input-1"
            class="mt-5"
          >
            <b-form-input v-model="profesor.email" type="email" required></b-form-input>
          </b-form-group> 

          <b-form-group
            id="input-group-2"
            label="Contraseña"
            label-for="input-2"
          >
            <b-form-input v-model="profesor.contrasena" type="password" required></b-form-input>
            <p v-if="validarLogin">El email o la contraseña son incorrectos</p>
          </b-form-group> 
          <b-button type="submit"> Acceder </b-button>
        </form>

        <div>
            <p style="margin-bottom: 0; margin-top: 10px">¿No tienes cuenta?</p>
            <router-link to="/registro">Regístrate</router-link>
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
      validarLogin: false
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(['getData'])
  },
  methods: {
    async login() {
      try {
        const profesoresRef = await db.collection('profesores').where('email', '==', this.profesor.email).get();
        console.log(profesoresRef.docs[0]);
        
        profesoresRef.forEach(doc => {
        let data = doc.data();
        this.profesor.nombre = data.nombre;
        this.profesor.apellidos = data.apellidos;
        //this.profesor.email = data.email;
        //this.profesor.contrasena = data.contrasena;
        this.profesor.confirmarContrasena = data.confirmarContrasena;
        this.profesor.foto = data.foto;
        this.profesor.puntuacion = data.puntuacion;
        this.profesor.proyectosDocentes = data.proyectosDocentes;
        this.profesor.publicacionesDocentes = data.publicacionesDocentes;
        this.profesor.publicaciones = data.publicaciones;
        this.profesor.horas = data.horas;
        this.profesor.cursosDocentes = data.cursosDocentes;
        this.profesor.trabajosSupervisados = data.trabajosSupervisados;
        this.profesor.estancias = data.estancias;
        this.profesor.correoAlumnos = data.correoAlumnos;
        });
        store.dispatch('updateFields', profesoresRef);
        //this.updateField(profesoresRef);
      } catch (error) {
        console.log(error);
      }
      
      
      firebase
        .auth()
        .signInWithEmailAndPassword(this.profesor.email, this.profesor.contrasena)
        .then((user) => {this.$router.replace('home'); this.registrado = true}, (error) => {console.error(error); this.validarLogin = true});
    },
    // updateField(profesoresRef) {
    //   console.log(profesoresRef.docs[0])
    //   var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

    //   p.update( {
    //     nombre: this.profesor.apellidos
    //   })
    //   .then(function() {
    //     console.log("Document changed");
    //   })
    //   .catch(function(error) {
    //     console.log("Error: " + error);
    //   })
    // }
  },
};
</script>

<style></style>
