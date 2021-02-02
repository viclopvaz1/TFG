<template>
  <div>
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>
    
    <InformacionProfesor/>

    <b-container style="max-width: initial">
      <b-row>
        <b-col md="2" style="padding-left: 20px">
          <BotonesPublico/>
        </b-col>
      
        <b-col md="8" style="padding-right: 20px">
          <VisualizacionComentarios :style="profesor.seleccionPublica[7] ? {'display' : 'grid'} : {'display' : 'none'}"/>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import InformacionProfesor from "@/components/InformacionProfesor.vue";
import BotonesPublico from "@/components/BotonesPublico";
import VisualizacionComentarios from "@/components/VisualizacionComentarios.vue";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import store from "../store";

export default {
  name: "PaginaPrincipal",
  components: {
    BarraSinRegistrar,
    BarraRegistrado,
    InformacionProfesor,
    BotonesPublico,
    VisualizacionComentarios
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData", "recuperarState"]),
  },
  created() {
    if (this.profesor.nombre == "") {
      this.$router.replace('home');
    }
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch("getData");
    //store.dispatch('updateFields');
    store.dispatch("recuperarState");
  },
  methods: {},
};
</script>
