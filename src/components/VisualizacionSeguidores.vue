<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block; border-color: #17a2b8">
            <b-card v-for="(profesor, key) in seguidores" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
                <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                    <b-col>
                        <b-avatar
                        :src="profesor.foto"
                        alt="Foto profesor"
                        size="3rem"
                        style="margin-right: 20px"
                        button @click="onClick(profesor)">
                    </b-avatar>
                    {{profesor.nombre}} {{profesor.apellidos}} Puntuación: {{profesor.puntuacion}}
                    </b-col>
                    <b-col style="text-align: right">
                        <b-button v-if="compruebaNoSiguiendo(profesor)" variant="primary" @click="seguir(profesor)">Seguir</b-button>
                        <b-button v-if="compruebaSiguiendo(profesor)" variant="primary" @click="dejarSeguir(profesor)">Dejar de Seguir</b-button>
                    </b-col>
                </b-row>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';
import store from '../store';
import {db} from '../main';

export default {
    
    name: "VisualizacionSeguidores",
    data() {
        return {

        }
    },
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB", "administrador", "tarjetaProfesor"]),
        ...mapActions(['getData', 'recuperarState', 'updateHoras', 'updateJustificacion', 'recuperarStateAdmin', 'getAdmins']),
        seguidores() {
            return this.tarjetaProfesor.seguidores;
        }
    },
    methods: {
        compruebaNoSiguiendo(profesor) {
            var result = false;
            var profesorLogueado = this.profesor.seguidos.find(element => element.email == profesor.email);
            if (profesor.email != this.profesor.email && profesorLogueado == undefined) {
                result = true;
            }
            return result;
        },
        compruebaSiguiendo(profesor) {
            var result = false;
            var profesorLogueado = this.profesor.seguidos.find(element => element.email == profesor.email);
            if (profesor.email != this.profesor.email && profesorLogueado != undefined) {
                result = true;
            }
            return result;
        },
        async seguir(profesor) {
            this.profesor.seguidos.push(profesor);
            store.dispatch("updateFields");

             var seguidor = {
                nombre: this.profesor.nombre,
                apellidos: this.profesor.apellidos,
                puntuacion: this.profesor.puntuacion,
                email: this.profesor.email,
                foto: this.profesor.foto
            };

            try {
                const profesoresRef = await db.collection('profesores').where('email', '==', profesor.email.toLowerCase()).get();
                var listaSeguidores = [];
                var puntuacionSeguidoresProfesor = false;
                var puntuacionProfesor = 0.0;
                profesoresRef.forEach(doc => {
                    let data = doc.data();
                    listaSeguidores = data.seguidores;
                    puntuacionSeguidoresProfesor = data.puntuacionSeguidores;
                    puntuacionProfesor = data.puntuacion;
                });

                listaSeguidores.push(seguidor);
                if (listaSeguidores.length >= 2 && !puntuacionSeguidoresProfesor) {
                    puntuacionProfesor += 1;
                    puntuacionSeguidoresProfesor = true;
                }

                var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

                p.update({
                seguidores: listaSeguidores,
                puntuacion: puntuacionProfesor,
                puntuacionSeguidores: puntuacionSeguidoresProfesor
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
            await store.dispatch("updateListaSeguidores");
            await store.dispatch("updateListaSeguidos");
        },
        async dejarSeguir(profesor) {
            this.profesor.seguidos.splice(this.profesor.seguidos.findIndex(element => element.email == profesor.email), 1);
            store.dispatch("updateFields");

            try {
                const profesoresRef = await db.collection('profesores').where('email', '==', profesor.email.toLowerCase()).get();
                var listaSeguidores = [];
                var puntuacionSeguidoresProfesor = false;
                var puntuacionProfesor = 0.0;
                profesoresRef.forEach(doc => {
                    let data = doc.data();
                    listaSeguidores = data.seguidores;
                    puntuacionSeguidoresProfesor = data.puntuacionSeguidores;
                    puntuacionProfesor = data.puntuacion;
                });

                listaSeguidores.splice(listaSeguidores.findIndex(element => element.email == this.profesor.email), 1);
                if (listaSeguidores.length < 2 && puntuacionSeguidoresProfesor) {
                    puntuacionProfesor -= 1;
                    puntuacionSeguidoresProfesor = false;
                }

                var p = db.collection('profesores').doc(profesoresRef.docs[0].id);

                p.update({
                seguidores: listaSeguidores,
                puntuacion: puntuacionProfesor,
                puntuacionSeguidores: puntuacionSeguidoresProfesor
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
            await store.dispatch("updateListaSeguidores");
            await store.dispatch("updateListaSeguidos");
        },
        async onClick(profesor) {
            await store.dispatch("getData");
            this.tarjetaProfesor = this.profesoresDB.find(element => element.email === profesor.email);
            localStorage.setItem('profesorBuscado', profesor.email);
            
            await store.dispatch("updateListaSeguidores");
            await store.dispatch("updateListaSeguidos");
            if (firebase.auth().currentUser != null && firebase.auth().currentUser.email == profesor.email){
                this.$router.replace('paginaPrincipal');
            } else {
                this.$router.replace('perfilBuscado');
            }
        }
    }
}
</script>