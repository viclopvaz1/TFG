<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block; border-color: #17a2b8">
            <b-card v-for="(estancia, key) in tarjetaProfesor.estancias" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
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