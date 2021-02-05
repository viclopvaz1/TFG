<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(cursoDocente, key) in profesor.cursosDocentes" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters>
                    {{cursoDocente.lugar}}
                </b-row>
                <b-row no-gutters>
                    {{cursoDocente.descripcion}}
                </b-row>
                <b-row no-gutters>
                    {{cursoDocente.duracion}} horas
                </b-row>
                <b-row no-gutters>
                    {{cursoDocente.tipo}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionCursoDocente",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>