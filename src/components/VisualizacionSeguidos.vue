<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block; border-color: #17a2b8">
            <b-card v-for="(profesor, key) in seguidos" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
                <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                    <b-avatar
                        :src="profesor.foto"
                        alt="Foto profesor"
                        size="3rem"
                        style="margin-right: 20px"
                        button @click="onClick(profesor)">
                    </b-avatar>
                    {{profesor.nombre}} {{profesor.apellidos}} Puntuación: {{profesor.puntuacion}}
                </b-row>
            </b-card>
        </b-card>    
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';

export default {
    
    name: "VisualizacionSeguidos",
    data() {
        return {

        }
    },
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB", "administrador", "tarjetaProfesor"]),
        ...mapActions(['getData', 'recuperarState', 'updateHoras', 'updateJustificacion', 'recuperarStateAdmin', 'getAdmins']),
        seguidos() {
            return this.tarjetaProfesor.seguidos;
        }
    },
    methods: {
        onClick(profesor) {
        this.tarjetaProfesor = this.profesoresDB.find(element => element.email === profesor.email);
        localStorage.setItem('profesorBuscado', profesor.email);
        if (firebase.auth().currentUser != null && firebase.auth().currentUser.email == profesor.email){
            this.$router.replace('paginaPrincipal');
        } else {
            this.$router.replace('perfilBuscado');
        }
      }
    }
}
</script>