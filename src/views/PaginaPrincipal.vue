<template>
  <div style="background-color: #dddcdc; padding-bottom: 20px; min-height: 100vh">
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>
    
    <InformacionProfesor/>

    <b-container style="max-width: initial">
      <b-row>
        <b-col md="2" style="padding-left: 50px">
          <BotonesPublico/>
        </b-col>
        <b-col md="10" style="padding-right: 50px; padding-left: 35px">
          <VisualizacionPublicacionesDocentes :style="profesor.seleccionPublica[0] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionPublicaciones :style="profesor.seleccionPublica[1] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionHoras :style="profesor.seleccionPublica[2] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionProyectoDocente :style="profesor.seleccionPublica[3] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionCursoDocente :style="profesor.seleccionPublica[4] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionTrabajoSupervisado :style="profesor.seleccionPublica[5] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionEstancias :style="profesor.seleccionPublica[6] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionComentarios :style="profesor.seleccionPublica[7] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <Resumenes :style="profesor.seleccionPublica[8] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionSeguidos :style="profesor.seleccionPublica[9] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <VisualizacionSeguidores :style="profesor.seleccionPublica[10] ? {'display' : 'grid'} : {'display' : 'none'}"/>
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
import VisualizacionProyectoDocente from "@/components/VisualizacionProyectoDocente.vue";
import VisualizacionCursoDocente from "@/components/VisualizacionCursoDocente.vue";
import VisualizacionTrabajoSupervisado from "@/components/VisualizacionTrabajoSupervisado.vue";
import VisualizacionEstancias from "@/components/VisualizacionEstancias.vue";
import VisualizacionSeguidos from "@/components/VisualizacionSeguidos.vue";
import VisualizacionSeguidores from "@/components/VisualizacionSeguidores.vue";
import Resumenes from "@/components/Resumenes";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';
import store from '../store';

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
    VisualizacionHoras,
    VisualizacionProyectoDocente,
    VisualizacionCursoDocente,
    VisualizacionTrabajoSupervisado,
    VisualizacionEstancias,
    Resumenes,
    VisualizacionSeguidos,
    VisualizacionSeguidores
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "administradoresDB", "tarjetaProfesor"]),
    ...mapActions(["getData", "recuperarState", "getAdmins", 'updateListaSeguidores', 'updateListaSeguidos']),
  },
  async mounted() {
    try {
      let admins = await store.dispatch("getAdmins");
      this.administradoresDB = admins;
    } catch (error) {
      console.log(error);
    }
  },
  async created() {
    try {
      var notAdmin = true;
      
        if (firebase.auth().currentUser) {
          for (var adminKey in this.administradoresDB) {

            if (firebase.auth().currentUser.email == this.administradoresDB[adminKey].email){
              this.$router.replace('validacionHoras');
              notAdmin = false;
              break;
            }
          }

          if (notAdmin) {
            store.dispatch("recuperarState", {email: firebase.auth().currentUser.email});
            this.tarjetaProfesor = this.profesor;
            store.dispatch("updateListaSeguidores");
            store.dispatch("updateListaSeguidos");
          }

        }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
