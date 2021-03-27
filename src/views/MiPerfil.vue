<template>
  <div style="background-color: #dddcdc; padding-bottom: 20px;">
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>

    <InformacionProfesor/>

    <b-container style="max-width: initial">
      <b-row>
        <b-col md="2" style="padding-left: 50px">
          <BotonesPrivado/>
        </b-col>
      
        <b-col md="10" style="padding-right: 50px; padding-left: 35px; height: 600px">
          <ModificarPerfil :style="profesor.seleccionPrivada[0] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <ModificarContrasena :style="profesor.seleccionPrivada[1] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <Comentarios :style="profesor.seleccionPrivada[2] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <PublicacionesSeguidos :style="profesor.seleccionPrivada[3] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <Resumenes :style="profesor.seleccionPrivada[4] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <HorasNoValidadas :style="profesor.seleccionPrivada[5] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirPublicacionesDocentes :style="profesor.seleccionPrivada[6] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirPublicaciones :style="profesor.seleccionPrivada[7] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirHoras :style="profesor.seleccionPrivada[8] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirProyectosDocentes :style="profesor.seleccionPrivada[9] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirCursosDocentes :style="profesor.seleccionPrivada[10] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirTrabajosSupervisados :style="profesor.seleccionPrivada[11] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <SubirEstancias :style="profesor.seleccionPrivada[12] ? {'display' : 'grid'} : {'display' : 'none'}"/>
        </b-col>
      </b-row>
    </b-container>

  </div>

    
</template>

<script>
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import InformacionProfesor from "@/components/InformacionProfesor.vue";
import BotonesPrivado from "@/components/BotonesPrivado";
import ModificarPerfil from "@/components/ModificarPerfil";
import ModificarContrasena from "@/components/ModificarContrasena";
import Comentarios from "@/components/Comentarios";
import PublicacionesSeguidos from "@/components/PublicacionesSeguidos";
import Resumenes from "@/components/Resumenes";
import HorasNoValidadas from "@/components/HorasNoValidadas";
import SubirHoras from "@/components/SubirHoras";
import SubirProyectosDocentes from "@/components/SubirProyectosDocentes";
import SubirTrabajosSupervisados from "@/components/SubirTrabajosSupervisados";
import SubirEstancias from "@/components/SubirEstancias";
import SubirCursosDocentes from "@/components/SubirCursosDocentes";
import SubirPublicacionesDocentes from "@/components/SubirPublicacionesDocentes";
import SubirPublicaciones from "@/components/SubirPublicaciones";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';
import store from '../store';

export default {
  name: "MiPerfil",
  components: {
    BarraSinRegistrar,
    BarraRegistrado,
    InformacionProfesor,
    BotonesPrivado,
    ModificarPerfil,
    ModificarContrasena,
    Comentarios,
    Resumenes,
    SubirHoras,
    SubirProyectosDocentes,
    SubirTrabajosSupervisados,
    SubirEstancias,
    SubirCursosDocentes,
    SubirPublicacionesDocentes,
    SubirPublicaciones,
    HorasNoValidadas,
    PublicacionesSeguidos
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor", "administradoresDB"]),
    ...mapActions(['getData', 'recuperarState', 'getAdmins', 'updatePublicacionesSeguidos']),
    
  },
  data() {
    return {
    }
  },
  async mounted() {
    try {
      let admins = await store.dispatch("getAdmins");
      this.administradoresDB = admins;
      store.dispatch("updatePublicacionesSeguidos");
      
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
            store.dispatch("updatePublicacionesSeguidos");
            this.tarjetaProfesor = this.profesor;
          }

        }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>