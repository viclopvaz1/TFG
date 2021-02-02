<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(comentario, key) in profesor.comentarios" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters>
                    {{comentario.texto}}
                </b-row>
                <b-row no-gutters>
                    {{comentario.valoracion}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionComentarios",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>