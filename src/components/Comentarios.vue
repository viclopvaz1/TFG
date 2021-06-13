<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">
            <b-card-text>
                Escribe aquí los correos de tus alumnos,
                separados por coma, para que te puedan 
                dejar un comentario y una valoración.
            </b-card-text>
            <b-form-textarea id="textarea" v-model="correos" placeholder="Añade el correo de tus alumnos aquí" style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-textarea>

            <div style="text-align: center">
                <b-button variant="primary" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px; margin-top: 15px" @click.prevent="enviarInvitacion">Enviar Invitación</b-button>
            </div>

            <b-alert v-model="validacion" dismissible variant="danger" class="mt-3">
                El correo {{ correoErroneo }} no tiene un formato correcto. Debe tener 4 o menos subdominios
            </b-alert>
        </b-card>
    </div>
</template>

<style>
.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #858081 !important;
  opacity: 1;
}
</style>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';

export default {
    name: 'Comentarios',
    data() {
        return {
            correos: '',
            validacionCorreo: true,
            validacion: false,
            correoErroneo: ''
        }
    },
    computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData", "updateFields"])
    },
    methods: {
        enviarInvitacion() {
            const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,63}){1,3})$/;
            var correos = this.correos.split(',');
            this.profesor.correoAlumnos = [];
            for (let correo in correos) {
                this.validacionCorreo = emailRegex.test(correos[correo].trim());
                if (this.validacionCorreo) {
                    this.profesor.correoAlumnos.push(correos[correo].trim());
                } else {
                    this.correoErroneo = correos[correo];
                    this.validacion = !this.validacionCorreo;
                    break;
                }
            }

            if (this.validacionCorreo) {
                var mailTo = 'mailTo:' + this.correos + '?subject=Enlace para valoracion&body=https://tfgus-fce00.web.app/#/valoracion';
                window.open(mailTo);
                store.dispatch('updateFields');
            }
        }
    }
}
</script>