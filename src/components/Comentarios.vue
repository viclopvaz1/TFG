<template>
    <div>
        <b-card>
            <b-card-text>
                Escribe aquí los correos de tus alumnos,
                separados por coma, para que te puedan 
                dejar un comentario y una valoración.
            </b-card-text>
            <b-form-textarea id="textarea" v-model="correos" placeholder="Añade el correo de tus alumnos aquí"></b-form-textarea>
            <b-card-text v-if="!validacionCorreo">El correo {{ correoErroneo }} no tiene un formato correcto. Debe tener 4 o menos subdominios</b-card-text>
            <b-button variant="primary" style="margin-top: 15px" @click.prevent="enviarInvitacion">Enviar Invitación</b-button>

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
    name: 'Comentarios',
    data() {
        return {
            correos: '',
            validacionCorreo: true,
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
            for (let i = 0; i < correos.length; i++) {
                this.validacionCorreo = emailRegex.test(correos[i].trim());
                if (this.validacionCorreo) {
                    this.profesor.correoAlumnos.push(correos[i]);
                } else {
                    this.correoErroneo = correos[i];
                    break;
                }
            }

            if (this.validacionCorreo) {
                var mailTo = 'mailTo:' + this.correos + '?subject=Enlace para valoracion&body=http://localhost:8080/#/valoracion';
                window.open(mailTo);
                store.dispatch('updateFields');
            }
        }
    }
}
</script>