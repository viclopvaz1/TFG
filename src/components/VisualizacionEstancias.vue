<template>
    <div>
        <b-card class="overflow-auto" style="height: 640px; display: block; background-color: #f7f5f6; border-radius: 10px">
            <b-card v-for="(estancia, key) in tarjetaProfesor.estancias" :key="key" style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    {{estancia.lugar}}
                </b-row>
                <b-row no-gutters>
                    {{estancia.duracion}} dias
                </b-row>
                <b-row no-gutters>
                    {{estancia.asignatura}}
                </b-row>
                <b-row no-gutters>
                    {{estancia.idioma}}
                </b-row>
                <b-row no-gutters>
                    {{estancia.tipo}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionEstancias",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>