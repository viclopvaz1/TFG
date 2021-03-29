<template>
    <div>
        <b-card class="overflow-auto" style="height: 640px; display: block; background-color: #f7f5f6; border-radius: 10px">
            <b-card v-for="(hora, key) in horas" :key="key" style="margin: 20px; background-color: #f7f5f6; border-radius: 10px; border-color: #9d9d9d">
                <b-row no-gutters>
                    {{hora.institucion}} {{hora.asignatura}} {{hora.idioma}} {{hora.ano}} {{hora.horas}} horas
                </b-row>
                <b-row no-gutters>
                    {{hora.justificacionHora}}
                </b-row>
            </b-card>
        </b-card>
        
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
    name: "HorasNoValidadas",
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor", "administradoresDB"]),
        ...mapActions(['getData', 'recuperarState', 'getAdmins']),
        horas() {
            var horasProfe = [];
            for (let horaIndex in this.profesor.horas) {
                if (this.profesor.horas[horaIndex].validada == 2) {
                    horasProfe.push(this.profesor.horas[horaIndex]);
                }
            }
            return horasProfe;
        }
    },
}
</script>