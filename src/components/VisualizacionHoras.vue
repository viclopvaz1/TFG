<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block; border-color: #17a2b8">
            <b-card v-for="(hora, key) in profe" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
                <b-row no-gutters>
                    {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}}
                </b-row>
                <b-row no-gutters>
                    {{hora.horas}} horas
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionHoras",
    computed: {
        ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
        ...mapActions(['getData', 'recuperarState']),
        profe() {
            var profeHoras = [];
            for (let index in this.tarjetaProfesor.horas) {
                if (this.tarjetaProfesor.horas[index].validada){
                    profeHoras.push(this.tarjetaProfesor.horas[index]);
                }
            }
            return profeHoras;
        }
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>