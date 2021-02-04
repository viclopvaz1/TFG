<template>
    <div>
        <BarraSinRegistrar v-if="!registrado"/>
        <BarraRegistrado v-if="registrado"/>

        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(profesor, key) in profesores" :key="key" style="margin-bottom: 5px">
                <b-card v-for="(hora, keyHora) in profesor.horas" :key="keyHora">
                    <b-row no-gutters>
                        {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}}
                    </b-row>
                    <b-row no-gutters>
                        {{hora.horas}} horas
                    </b-row>
                </b-card>
                
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
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB"]),
        ...mapActions(['getData', 'recuperarState']),
        profesores() {
            var profeHoras = [];
            for (let profIndex in this.profesoresDB) {
                for (let horaIndex in this.profesoresDB[profIndex].horas) {
                    if (!this.profesoresDB[profIndex].horas[horaIndex].validada) {
                        profeHoras.push(this.profesoresDB[profIndex]);
                        break;
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
    }
}
</script>