<template>
    <div>
        <b-card class="overflow-auto" style="height: 640px; display: block; border-color: #17a2b8">
            <b-card v-for="(publicacion, key) in tarjetaProfesor.publicaciones" :key="key" style="margin-bottom: 5px; border-color: #17a2b8">
                <b-row no-gutters>
                    {{publicacion.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{publicacion.descripcion}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionPublicaciones",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>