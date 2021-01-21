<template>
    <div>
        <b-card>
            <b-card-text>
                Escribe aquí los correos de tus alumnos,
                separados por coma, para que te puedan 
                dejar un comentario y una valoración.
            </b-card-text>
            <b-form-textarea id="textarea" v-model="correos" placeholder="Añade el correo de tus alumnos aquí"></b-form-textarea>
            <b-card-text v-if="!validacionCorreo">El correo {{ correoErroneo }} no tiene un formato correcto. Debe acabar en @alumn.us.es</b-card-text>
            <b-button variant="primary" style="margin-top: 15px" @click.prevent="enviarInvitacion">Enviar Invitación</b-button>

        </b-card>
    </div>
</template>

<script>
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import {db} from '../main';
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
            console.log(this.correos);
            var correos = this.correos.split(',');
            this.profesor.correoAlumnos = [];
            for (let i = 0; i < correos.length; i++) {
                console.log(correos[i]);
                console.log("entra en el for");
                console.log(correos[i].substring(correos[i].length - 12, correos[i].length));
                this.validacionCorreo = correos[i].substring(correos[i].length - 12, correos[i].length) == '@alumn.us.es'
                if (this.validacionCorreo) {
                    console.log("entra en el if");
                    this.profesor.correoAlumnos.push(correos[i]);
                    console.log(this.profesor.correoAlumnos);
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