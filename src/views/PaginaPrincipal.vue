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
          <VisualizacionProyectoDocente :style="profesor.seleccionPublica[3] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionCursoDocente :style="profesor.seleccionPublica[4] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionTrabajoSupervisado :style="profesor.seleccionPublica[5] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionEstancias :style="profesor.seleccionPublica[6] ? {'display' : 'grid'} : {'display' : 'none'}"/>
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
import VisualizacionProyectoDocente from "@/components/VisualizacionProyectoDocente.vue";
import VisualizacionCursoDocente from "@/components/VisualizacionCursoDocente.vue";
import VisualizacionTrabajoSupervisado from "@/components/VisualizacionTrabajoSupervisado.vue";
import VisualizacionEstancias from "@/components/VisualizacionEstancias.vue";
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
    VisualizacionProyectoDocente,
    VisualizacionCursoDocente,
    VisualizacionTrabajoSupervisado,
    VisualizacionEstancias
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData", "recuperarState"]),
  },
  created() {
    store.dispatch("recuperarState");
    if (localStorage.getItem('userEmail') == "") {
      this.$router.replace('home');
    }
    // Encode the String
    var encodedStringBtoA = btoa(localStorage.getItem('userEmail'));
    var kk = encodedStringBtoA.slice(0, 2) + "i" + encodedStringBtoA.slice(2, 6) + "v" + encodedStringBtoA.slice(6);
    console.log('Encriptado= ' + encodedStringBtoA);
    console.log('Encriptado modificado= ' + kk);
    var decodedStringAtoB = atob(encodedStringBtoA);
    console.log('Desencriptado = ' + decodedStringAtoB);
    var kk3 = kk.slice(0, 2) + kk.slice(3, 7) + kk.slice(8);
    console.log(kk3)
    console.log(kk3 == encodedStringBtoA)
    var kk4 = atob(kk3);
    console.log('Desencriptado Bien= ' + kk4)
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch("getData");
  },
  methods: {},
};
</script>
