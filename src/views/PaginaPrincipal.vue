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
          <VisualizacionPublicacionesDocentes :style="profesor.seleccionPublica[0] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionPublicaciones :style="profesor.seleccionPublica[1] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionHoras :style="profesor.seleccionPublica[2] ? {'display' : 'grid'} : {'display' : 'none'}"/>
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
import VisualizacionPublicacionesDocentes from "@/components/VisualizacionPublicacionesDocentes.vue";
import VisualizacionPublicaciones from "@/components/VisualizacionPublicaciones.vue";
import VisualizacionHoras from "@/components/VisualizacionHoras.vue";
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
    VisualizacionComentarios,
    VisualizacionPublicacionesDocentes,
    VisualizacionPublicaciones,
    VisualizacionHoras
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData", "recuperarState"]),
  },
  async created() {
    try {
      await store.dispatch("recuperarState");
      console.log(localStorage.getItem('userEmail'))
      if (localStorage.getItem('userEmail') == "") {
        this.$router.replace('home');
      }
    } catch (error) {
      console.log(error);
    }
    
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch("getData");
  },
  methods: {},
};
</script>
