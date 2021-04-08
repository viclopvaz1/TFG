<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="tarjetaProfesor.publicacionesDocentes.length == 0" style="text-align: center">
                <b-card-text>Este profesor aun no ha subido publicaciones docentes.</b-card-text>
            </div>
            <b-card v-for="(pd, key) in tarjetaProfesor.publicacionesDocentes" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    {{pd.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{pd.descripcion}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionPublicacionesDocentes",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>