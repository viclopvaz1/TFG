<template>
    <div>
        <BarraSinRegistrar v-if="!registrado"/>
        <BarraRegistrado v-if="registrado"/>

        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(profesor, key) in profesores" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters style="align-items: center; margin-bottom: 15px">
                    <b-avatar
                        :src="profesor.foto"
                        alt="Foto profesor"
                        size="3rem"
                        style="margin-right: 20px">
                    </b-avatar>
                    {{profesor.nombre}} {{profesor.apellidos}} {{profesor.email}}
                </b-row>

                <b-card v-for="(hora, keyHora) in profesor.horas" :key="keyHora">
                    <b-row no-gutters>
                        {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}}
                    </b-row>
                    <b-row no-gutters>
                        {{hora.horas}} horas
                    </b-row>
                </b-card>

                <b-row no-gutters style="margin-top: 15px; margin-bottom: 15px">
                    URL al archivo: {{profesor.urlArchivoHoras}}
                </b-row>

                <b-row no-gutters>
                    <b-col style="max-width: fit-content; margin-right: 100px">
                        <b-button @click="validar(profesor)" variant="primary" type="submit">Validar</b-button>
                    </b-col>
                    
                    <b-col style="max-width: fit-content; margin-right: 15px">
                        <form @submit.prevent="noValidar(profesor)">
                            <b-button type="submit" variant="primary">No validar</b-button>
                        </form>
                    </b-col>

                    <b-col>
                        <b-form-textarea  v-model="profesor.justificacionHoras" type="text" placeholder="Justificación" :maxlength="300"></b-form-textarea>
                    </b-col>
                    
                </b-row>

                <b-row no-gutters>
                    <b-alert :show="profesor.tieneJustificacion" variant="warning" class="mt-3">
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
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import store from "../store";

export default {
    name: "ValidacionHoras",
    components: {
        BarraSinRegistrar,
        BarraRegistrado,
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB"]),
        ...mapActions(['getData', 'recuperarState', 'updateHoras', 'updateJustificacion']),
        profesores() {
            var profeHoras = [];
            for (let profIndex in this.profesoresDB) {
                if (this.profesor.justificacionHoras == "") {
                    for (let horaIndex in this.profesoresDB[profIndex].horas) {
                        if (!this.profesoresDB[profIndex].horas[horaIndex].validada) {
                            profeHoras.push(this.profesoresDB[profIndex]);
                            break;
                        }
                    }
                }
            }
            return profeHoras;
        }
    },
    created() {
        var admin = false;
        for (var adminKey in this.administradoresDB) {
            if (localStorage.getItem('userEmail') == this.administradoresDB[adminKey].email){
                admin = true;
                break;
            }
        }

        if (!admin) {
            this.$router.replace('home');
        }

        store.dispatch("getData");
    },
    methods: {
        validar(profesor){
            this.profesor.email = profesor.email;
            for (var horaIndex in profesor.horas) {
                if (!profesor.horas[horaIndex].validada) {
                    profesor.horas[horaIndex].validada = true;
                }
            }
            this.profesor.horas = profesor.horas;
            this.profesor.urlArchivoHoras = profesor.urlArchivoHoras;
            profesor.tieneJustificacion = false;
            this.profesor.tieneJustificacion = profesor.tieneJustificacion;
            store.dispatch("updateHoras");
        },
        noValidar(profesor){
            if (profesor.justificacionHoras != "") {
                this.profesor.email = profesor.email;
                this.profesor.justificacionHoras = profesor.justificacionHoras;
                profesor.tieneJustificacion = false;
                this.profesor.tieneJustificacion = profesor.tieneJustificacion;
                store.dispatch("updateJustificacion");
            } else {
                profesor.tieneJustificacion = true;
            }
        }
    }
}
</script>