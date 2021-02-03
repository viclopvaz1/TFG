<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(publicacion, key) in profesor.publicaciones" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters>
                    {{publicacion.descripcion}}
                </b-row>
                <b-row no-gutters>
                    {{publicacion.titulo}}
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