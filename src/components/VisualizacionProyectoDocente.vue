<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(proyectoDocente, key) in tarjetaProfesor.proyectosDocentes" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters>
                    {{proyectoDocente.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{proyectoDocente.descripcion}}
                </b-row>
                <b-row no-gutters>
                    {{proyectoDocente.url}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionProyectoDocente",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>