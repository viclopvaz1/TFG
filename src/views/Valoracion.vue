<template>
  <div style="text-align: -webkit-center; background-color: #dddcdc; padding-top: 20px; height: 100vh">
    <b-card class="overflow: hidden" style="margin: 20px; width: 60%; border-color: #17a2b8">
      <form @submit.prevent="enviarComentario">
        <b-form-group label="Correo profesor:" label-for="input-correoProfesor" class="mt-2" label-cols-md="2" >
          <b-form-input id="input-correoProfesor" v-model="correoProfesor" type="email" 
          placeholder="Introduce el correo del profesor al que quieres hacer el comentario" required></b-form-input>
        </b-form-group>

        <b-form-group label="Tu correo:" label-for="input-tuCorreo" class="mt-2" label-cols-md="2">
          <b-form-input id="input-tuCorreo" v-model="correoAlumno" type="email" 
          placeholder="Introduce tu correo electrónico" required></b-form-input>
        </b-form-group>

        <b-form-group label="Comentario:" label-for="input-comentario" class="mt-2" label-cols-md="2">
          <b-form-textarea id="input-comentario" v-model="comentario.texto" type="text" :maxlength="300" required></b-form-textarea>
        </b-form-group>

        <b-form-rating id="rating-lg" style="width: 60%" v-model.number="comentario.valoracion" no-border size="lg"></b-form-rating>

        <b-button type="submit" variant="primary">Enviar Comentario</b-button>

        <b-row class="mt-3" style="justify-content: center">
            <b-alert :show="errorCorreoProfesor" dismissible variant="warning">
                El correo del profesor que has introducido no es un correo registrado
            </b-alert>
        </b-row>

        <b-row class="mt-3" style="justify-content: center">
            <b-alert :show="errorCorreoAlumno" dismissible variant="warning">
                El correo que has introducido no pertenece a la lista de correos del profesor que permite que le hagan comentarios
            </b-alert>
        </b-row>

      </form>

    </b-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import {db} from '../main';

export default {
  name: "Valoracion",
  components: {
    BarraSinRegistrar,
    BarraRegistrado,
  },
  data() {
    return {
      correoProfesor: "",
      correoAlumno: "",
      comentario: {
          texto: '',
          valoracion: 5.0
      },
      errorCorreoProfesor: false,
      errorCorreoAlumno: false,
      profesorComentario: {
          nombre: '',
          puntuacion: 0,
          puntuacionComentario: 0.0,
          correoAlumnos: [],
          comentarios: []
      }
    };
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData"]),
  },
  methods: {
    async enviarComentario() {
        try {
            this.profesorComentario.nombre = '';
            this.profesorComentario.puntuacion = 0.0;
            this.profesorComentario.puntuacionComentario = 0.0;
            this.profesorComentario.correoAlumnos = [];
            this.profesorComentario.comentarios = [];
            await this.getProfesor();
            this.errorCorreoProfesor = false;
            this.errorCorreoAlumno = false;
        if (this.profesorComentario.nombre == '') {
            this.errorCorreoProfesor = true;
        } else {
            this.errorCorreoProfesor = false;
            if (this.profesorComentario.correoAlumnos.includes(this.correoAlumno)) {
                this.profesorComentario.correoAlumnos.splice(this.profesorComentario.correoAlumnos.indexOf(this.correoAlumno));
                this.profesorComentario.comentarios.push(this.comentario);    

                this.profesorComentario.puntuacion -= this.profesorComentario.puntuacionComentario;

                if (this.profesorComentario.comentarios.length >= 10) {
                  var valoracionMaxima = this.profesorComentario.comentarios.length * 5;

                  var valoracionReal = this.profesorComentario.comentarios.filter(element => element.valoracion == 5.0).length * 5 
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 4.0).length * 4
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 3.0).length * 3 
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 2.0).length * 2
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 1.0).length;

                  this.profesorComentario.puntuacionComentario = Math.round(((valoracionReal * 2) / valoracionMaxima) * 100) / 100;
                }

                this.profesorComentario.puntuacion += this.profesorComentario.puntuacionComentario;

                await this.updateProfesor();
                this.$router.replace('home');
            } else {
                this.errorCorreoAlumno = true;
            }
        }
        } catch (error) {
            console.log(error);
        }
    },
    async getProfesor() {
        try {
            const profesor = await db.collection('profesores').where('email', '==', this.correoProfesor).get();
            profesor.forEach(doc => {
                let data = doc.data();
                this.profesorComentario.nombre = data.nombre;
                this.profesorComentario.puntuacion = data.puntuacionComentario;
                this.profesorComentario.puntuacionComentario = data.puntuacion;
                this.profesorComentario.correoAlumnos = data.correoAlumnos;
                this.profesorComentario.comentarios = data.comentarios;
            });
        } catch (error) {
            console.log(error);
        }
    },
    async updateProfesor() {
        try {
            const profesoresRef = await db.collection('profesores').where('email', '==', this.correoProfesor).get();
            var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

            p.update( {
                puntuacion: this.profesorComentario.puntuacion,
                puntuacionComentario: this.profesorComentario.puntuacionComentario,
                correoAlumnos: this.profesorComentario.correoAlumnos,
                comentarios: this.profesorComentario.comentarios
            })
            .then(function() {
                console.log("Document changed");
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
        } catch (error) {
            console.log(error);
        }
    }
  },
};
</script>
