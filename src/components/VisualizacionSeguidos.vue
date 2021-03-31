<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="seguidos.length == 0" style="text-align: center">
                <b-card-text>Este profesor aun no sigue a ningun otro profesor.</b-card-text>
            </div>
            <b-card v-for="(profesor, key) in seguidos" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
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
                        <b-button v-if="compruebaNoSiguiendo(profesor)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="seguir(profesor)">Seguir</b-button>
                        <b-button v-if="compruebaSiguiendo(profesor)" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="dejarSeguir(profesor)">Dejar de Seguir</b-button>
                    </b-col>
                    
                </b-row>
            </b-card>
        </b-card>    
    </div>
</template>

<style>
    .btn:focus, .btn.focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(199 181 145 / 50%) !important
    }
</style>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';
import store from '../store';
import {db} from '../main';

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
        compruebaNoSiguiendo(profesor) {
            var result = false;
            var profesorLogueado = this.profesor.seguidos.find(element => element.email == profesor.email);
            if (profesor.email != this.profesor.email && profesorLogueado == undefined && firebase.auth().currentUser != null) {
                result = true;
            }
            return result;
        },
        compruebaSiguiendo(profesor) {
            var result = false;
            var profesorLogueado = this.profesor.seguidos.find(element => element.email == profesor.email);
            if (profesor.email != this.profesor.email && profesorLogueado != undefined && firebase.auth().currentUser != null) {
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