<template>
    <div>
        <b-card class="overflow-auto" style="height: 600px; display: block">
            <b-card v-for="(trabajoSupervisado, key) in tarjetaProfesor.trabajosSupervisados" :key="key" style="margin-bottom: 5px">
                <b-row no-gutters>
                    {{trabajoSupervisado.titulo}}
                </b-row>
                <b-row no-gutters>
                    {{trabajoSupervisado.descripcion}}
                </b-row>
                <b-row no-gutters>
                    {{trabajoSupervisado.tipo}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "VisualizacionTrabajoSupervisado",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    created() {
        this.tarjetaProfesor = this.profesor;
    }
}
</script>