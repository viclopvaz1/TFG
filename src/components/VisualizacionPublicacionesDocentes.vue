<template>
    <div>
        <b-card class="overflow-auto" style="height: 640px; display: block; background-color: #f7f5f6; border-radius: 10px">
            <b-card v-for="(pd, key) in tarjetaProfesor.publicacionesDocentes" :key="key" style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
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