<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="tarjetaProfesor.comentarios.length == 0" style="text-align: center">
                <b-card-text>A este profesor aun no le han realizado comentarios.</b-card-text>
            </div>
            <b-card v-for="(comentario, key) in tarjetaProfesor.comentarios" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters style="padding-left: 10px">
                    {{comentario.texto}}
                </b-row>
                <b-row no-gutters>
                    <b-form-rating id="rating-lg" style="width: 20%; background-color: #f7f5f6; color: #c7b591; padding: 0" v-model.number="comentario.valoracion" no-border readonly size="lg"></b-form-rating>
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
    // created() {
    //     this.tarjetaProfesor = this.profesor;
    // }
}
</script>