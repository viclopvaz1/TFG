<template>
    <div>
        <BarraAdmin/>

        <b-card v-for="(profesor, key) in profesores" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
            <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                <b-avatar
                    :src="profesor.foto"
                    alt="Foto profesor"
                    size="3rem"
                    style="margin-right: 20px">
                </b-avatar>
                {{profesor.nombre}} {{profesor.apellidos}} {{profesor.email}}
            </b-row>
            <b-card-text>
                URL al archivo: {{profesor.urlArchivoHoras}}
            </b-card-text>

            <b-card v-for="(hora, keyHora) in profesor.horas" :key="keyHora" style="border-color: #17a2b8">
                <b-row no-gutters>
                    {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}} {{hora.ano}}
                </b-row>
                <b-row no-gutters>
                    {{hora.horas}} horas
                </b-row>

                <b-row no-gutters>
                    <b-col style="max-width: fit-content; margin-right: 100px">
                        <b-button @click="validar(profesor, hora)" variant="primary" type="submit">Validar</b-button>
                    </b-col>
                
                    <b-col style="max-width: fit-content; margin-right: 15px">
                        <form @submit.prevent="noValidar(profesor, hora)">
                            <b-button type="submit" variant="primary">No validar</b-button>
                        </form>
                    </b-col>

                    <b-col>
                        <b-form-textarea  v-model="hora.justificacionHora" type="text" placeholder="Justificación" :maxlength="300"></b-form-textarea>
                    </b-col>
                
                </b-row>

                <b-row no-gutters>
                    <b-alert :show="hora.justificacionHora == '' " variant="warning" class="mt-3">
                        Se debe de proporcionar una justificacion al no validar
                    </b-alert>
                </b-row>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import BarraAdmin from "@/components/BarraAdmin.vue";
import store from "../store";
import firebase from 'firebase';
import {db} from '../main';

export default {
    name: "ValidacionHoras",
    components: {
        BarraAdmin,
    },
    data() {
        return{
            administradores: []
        }
    },
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB", "administrador"]),
        ...mapActions(['getData', 'recuperarState', 'updateHoras', 'updateJustificacion', 'recuperarStateAdmin', 'getAdmins']),
        profesores() {
            var profeHoras = [];
            let profesor = {
                foto: '',
                nombre: '',
                apellidos: '',
                email: '',
                horas: [],
            };
            for (let profIndex in this.profesoresDB) {
                profesor = {
                    foto: '',
                    nombre: '',
                    apellidos: '',
                    email: '',
                    horas: [],
                }
                for (let horaIndex in this.profesoresDB[profIndex].horas) {
                    if (this.profesoresDB[profIndex].horas[horaIndex].validada == 0) {
                        profesor.horas.push(this.profesoresDB[profIndex].horas[horaIndex]);
                    }
                }
                if (profesor.horas.length > 0) {
                    profesor.foto = this.profesoresDB[profIndex].foto;
                    profesor.nombre = this.profesoresDB[profIndex].nombre;
                    profesor.apellidos = this.profesoresDB[profIndex].apellidos;
                    profesor.email = this.profesoresDB[profIndex].email;
                    profesor.urlArchivoHoras = this.profesoresDB[profIndex].urlArchivoHoras;
                    profeHoras.push(profesor);
                }
            }
            return profeHoras;
        }
    },
    async mounted() {
        try {
            if (firebase.auth().currentUser) {
                let admins = await store.dispatch("getAdmins");
                this.administradoresDB = admins;

                for (var adminKey in admins) {

                    if (firebase.auth().currentUser.email == admins[adminKey].email){
                        store.dispatch("getData");
                        this.$router.replace("validacionHoras");
                        break;
                    }
                }
            }
            console.log(this.administradoresDB);
        } catch (error) {
            console.log(error);
        }
    },
    async created() {
        try {
        var notAdmin = true;
        
            if (firebase.auth().currentUser) {
                for (var adminKey in this.administradoresDB) {

                    if (firebase.auth().currentUser.email == this.administradoresDB[adminKey].email){
                        store.dispatch("recuperarStateAdmin", {email: firebase.auth().currentUser.email});
                        notAdmin = false;
                        break;
                    }
                }

                if (notAdmin) {
                    this.$router.replace('home');
                    this.tarjetaProfesor = this.profesor;
                }

            }
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async validar(profesor, hora){
            this.profesor.email = profesor.email;
            try {
                const profesoresRef = await db.collection('profesores').where('email', '==', this.profesor.email).get();

                profesoresRef.forEach(doc => {
                let data = doc.data();
                this.profesor.horas = data.horas;
                });
                for (var horaIndex in this.profesor.horas) {
                    var horaDB = this.profesor.horas[horaIndex];
                    if (horaDB.ano == hora.ano && horaDB.asignatura == hora.asignatura && horaDB.horas == hora.horas && horaDB.idioma == hora.idioma && horaDB.institucion == hora.institucion && horaDB.validada == 0) {
                        this.profesor.horas[horaIndex].validada = 1;
                        this.profesor.horas[horaIndex].justificacionHora = "";
                        hora.validada = 1;
                        hora.justificacionHora = "";
                        break;
                    }
                }
                
                store.dispatch("updateHoras");
            } catch (error) {
                console.log(error);
            }
            
        },
        reload(){
            window.location.reload();
        },
        async noValidar(profesor, hora){
            // if (profesor.justificacionHoras != "") {
            //     this.profesor.email = profesor.email;
            //     this.profesor.justificacionHoras = profesor.justificacionHoras;
            //     profesor.tieneJustificacion = true;
            //     this.profesor.tieneJustificacion = profesor.tieneJustificacion;
            //     store.dispatch("updateJustificacion");
            // } else {
            //     profesor.tieneJustificacion = false;
            // }




            // if (hora.justificacionHora != "") {
            //     for (var horaIndex in profesor.horas) {
            //         var horaDB = profesor.horas[horaIndex];
            //         if (horaDB.ano == hora.ano && horaDB.asignatura == hora.asignatura && horaDB.horas == hora.horas && horaDB.idioma == hora.idioma && horaDB.institucion == hora.institucion && horaDB.validada == false) {
            //             profesor.horas.splice(horaIndex, 1);
            //             break;
            //         }
            //     }
            //     this.profesor.horas = profesor.horas;
            //     store.dispatch("updateHoras");
            // }
            if (hora.justificacionHora != "") {
                this.profesor.email = profesor.email;
                try {
                    const profesoresRef = await db.collection('profesores').where('email', '==', this.profesor.email).get();

                    profesoresRef.forEach(doc => {
                        let data = doc.data();
                        this.profesor.horas = data.horas;
                    });
                    for (var horaIndex in this.profesor.horas) {
                        var horaDB = this.profesor.horas[horaIndex];
                        if (horaDB.ano == hora.ano && horaDB.asignatura == hora.asignatura && horaDB.horas == hora.horas && horaDB.idioma == hora.idioma && horaDB.institucion == hora.institucion && horaDB.validada == 0) {
                            this.profesor.horas[horaIndex].validada = 2;
                            this.profesor.horas[horaIndex].justificacionHora = hora.justificacionHora;
                            hora.validada = 2;
                            break;
                        }
                    }
                    
                    store.dispatch("updateHoras");
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
</script>