<template>
  <div>
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>

    <InformacionProfesor/>

    <b-container style="max-width: initial">
      <b-row>
        <b-col md="2" style="padding-left: 20px">
          <BotonesPrivado/>
        </b-col>
      
        <b-col md="8" style="padding-right: 20px">
          <ModificarPerfil :style="profesor.seleccionPrivada[0] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <ModificarContrasena :style="profesor.seleccionPrivada[1] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <Comentarios :style="profesor.seleccionPrivada[2] ? {'display' : 'grid'} : {'display' : 'none'}"/>
          <Resumenes :style="profesor.seleccionPrivada[3] ? {'display' : 'grid'} : {'display' : 'none'}"/>
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
import Resumenes from "@/components/Resumenes";
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
        Resumenes
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(['getData', 'recuperarState']),
    
  },
  async created() {
    try {
      this.tarjetaProfesor = this.profesor;
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
  mounted() {
    
  }
}
</script>