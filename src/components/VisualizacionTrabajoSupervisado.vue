<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="tarjetaProfesor.trabajosSupervisados.length == 0" style="text-align: center">
                <b-card-text>Este profesor aun no ha subido trabajos supervisados.</b-card-text>
            </div>
            <b-card v-for="(trabajoSupervisado, key) in tarjetaProfesor.trabajosSupervisados" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Título</b-card-text>
                </b-row>
                <b-row no-gutters>
                    {{trabajoSupervisado.titulo}}
                </b-row>
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Descripción</b-card-text>
                </b-row>
                <b-row no-gutters>
                    {{trabajoSupervisado.descripcion}}
                </b-row>
                <b-row no-gutters>
                    <b-card-text>
                        <b>Tipo: </b>
                        {{trabajoSupervisado.tipo}}
                    </b-card-text>
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
    // created() {
    //     this.tarjetaProfesor = this.profesor;
    // }
}
</script>