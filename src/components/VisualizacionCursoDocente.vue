<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="tarjetaProfesor.cursosDocentes.length == 0" style="text-align: center">
                <b-card-text>Este profesor aun no ha subido cursos.</b-card-text>
            </div>
            <b-card v-for="(cursoDocente, key) in tarjetaProfesor.cursosDocentes" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
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
    // created() {
    //     this.tarjetaProfesor = this.profesor;
    // }
}
</script>