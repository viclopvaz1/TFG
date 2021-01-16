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
        <!-- <b-col md="10" style="padding-right: 20px">
          <ModificarPerfil/>
        </b-col> -->
        <b-col md="8" style="padding-right: 20px">
          <!-- <ModificarPerfil/> -->
          <ModificarContrasena />
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
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';



export default {
    name: "MiPerfil",
    components: {
        BarraSinRegistrar,
        BarraRegistrado,
        InformacionProfesor,
        BotonesPrivado,
        ModificarPerfil,
        ModificarContrasena
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData"]),
    
  },
  created() {
    console.log(this.tarjetaProfesor);
    this.tarjetaProfesor = this.profesor;
  },
  mounted() {
    
  }
}
</script>