<template>
  <div style="text-align: -webkit-center; background-color: #dddcdc; height: 100vh">
    <BarraSinRegistrar v-if="!registrado" />
    <BarraRegistrado v-if="registrado"/>

    <b-card class="overflow: hidden" style="margin: 20px; width: 60%; background-color: #f7f5f6; border-radius: 10px">
      <form @submit.prevent="enviarComentario">
        <b-form-group label="Correo profesor*:" label-for="input-correoProfesor" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-correoProfesor" v-model="correoProfesor" type="email" 
          placeholder="Introduce el correo del profesor al que quieres hacer el comentario" required
          style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Tu correo*:" label-for="input-tuCorreo" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-input id="input-tuCorreo" v-model="correoAlumno" type="email" 
          placeholder="Introduce tu correo electrónico" required
          style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
        </b-form-group>

        <b-form-group label="Comentario*:" label-for="input-comentario" class="mt-2" label-cols-md="2" style="color: #858081">
          <b-form-textarea id="input-comentario" v-model="comentario.texto" type="text" :maxlength="300" required
          style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-textarea>
        </b-form-group>

        <b-form-rating id="rating-lg" style="width: 60%; background-color: #f7f5f6; color: #c7b591" v-model.number="comentario.valoracion" no-border size="lg"></b-form-rating>

        <b-button type="submit" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Enviar Comentario</b-button>

        <b-row class="mt-3" style="justify-content: center">
            <b-alert :show="errorCorreoProfesor" dismissible variant="warning">
                El correo del profesor que has introducido no es un correo registrado
            </b-alert>
        </b-row>

        <b-row class="mt-3" style="justify-content: center">
            <b-alert :show="errorCorreoAlumno" dismissible variant="warning">
                Tu correo no pertenece a la lista de correos del profesor que permite que le hagan comentarios
            </b-alert>
        </b-row>

        <b-card-text style="color: #858081">
          *: Los campos con un asterisco son obligatorios.
        </b-card-text>

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
            if (this.profesorComentario.correoAlumnos.includes(this.correoAlumno)) {
                this.profesorComentario.correoAlumnos.splice(this.profesorComentario.correoAlumnos.indexOf(this.correoAlumno), 1);
                this.profesorComentario.comentarios.push(this.comentario);  
                
                var puntuacionComentarioAnterior = this.profesorComentario.puntuacionComentario;

                this.profesorComentario.puntuacion -= puntuacionComentarioAnterior;

                if (this.profesorComentario.comentarios.length >= 10) {
                  var valoracionMaxima = this.profesorComentario.comentarios.length * 5;

                  var valoracionReal = this.profesorComentario.comentarios.filter(element => element.valoracion == 5.0).length * 5 
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 4.0).length * 4
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 3.0).length * 3 
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 2.0).length * 2
                  + this.profesorComentario.comentarios.filter(element => element.valoracion == 1.0).length;

                  this.profesorComentario.puntuacionComentario = Math.round(((valoracionReal * 2) / valoracionMaxima) * 100) / 100;
                }

                var puntuacionComentarioNueva = this.profesorComentario.puntuacionComentario;

                this.profesorComentario.puntuacion += puntuacionComentarioNueva;

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
                this.profesorComentario.puntuacion = data.puntuacion;
                this.profesorComentario.puntuacionComentario = data.puntuacionComentario;
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
