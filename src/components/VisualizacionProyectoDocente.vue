<template>
    <div>
        <b-card class="overflow-auto" style="display: block; background-color: #f7f5f6; border-radius: 10px; max-height: 65vh">
            <div v-if="tarjetaProfesor.proyectosDocentes.length == 0" style="text-align: center">
                <b-card-text>Este profesor aun no ha subido proyectos docentes.</b-card-text>
            </div>
            <b-card v-for="(proyectoDocente, key) in tarjetaProfesor.proyectosDocentes" :key="key" 
                    style="margin-bottom: 5px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Título</b-card-text>
                </b-row> 
                <b-row no-gutters>
                    <b-card-text>{{proyectoDocente.titulo}}</b-card-text>
                </b-row>
                <b-row no-gutters>
                    <b-card-text style="font-weight: bold">Descripción</b-card-text>
                </b-row>
                <b-row no-gutters>
                    <b-card-text>{{proyectoDocente.descripcion}}</b-card-text>
                </b-row>
                <b-row no-gutters>
                    <b-card-text>
                        <b>URL: </b>
                        Pulse <a :href="proyectoDocente.url" target="_blank" style="color:  #c7b591">aquí</a> para acceder.
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
    name: "VisualizacionProyectoDocente",
    computed: {
    ...mapFields(["profesor", "profesoresDB", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    },
    // created() {
    //     this.tarjetaProfesor = this.profesor;
    // }
}
</script>