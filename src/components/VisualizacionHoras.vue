<template>
    <div>
        <b-card class="overflow-auto" style="height: 640px; display: block; background-color: #f7f5f6; border-radius: 10px">
            <b-card v-for="(hora, key) in profe" :key="key" style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}}
                </b-row>
                <b-row no-gutters>
                    {{hora.horas}} horas
                </b-row>
                <b-row no-gutters>
                    Curso {{hora.ano}}
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
                if (this.tarjetaProfesor.horas[index].validada == 1){
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