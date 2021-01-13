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
        <b-col md="10" style="padding-right: 20px">
          <ModificarPerfil/>
        </b-col>
      </b-row>
    </b-container>

    <pre>
      {{registrado}}
    </pre>
  </div>

    
</template>

<script>
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import InformacionProfesor from "@/components/InformacionProfesor.vue";
import BotonesPrivado from "@/components/BotonesPrivado";
import ModificarPerfil from "@/components/ModificarPerfil";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import firebase from 'firebase';

// Desloguear cuando se cierra la ventana
            // window.onbeforeunload = function (e) {
            //     firebase.auth().signOut();
            //     localStorage.setItem('userRegistrado', false);
            //     return null;
            // }

export default {
    name: "MiPerfil",
    components: {
        BarraSinRegistrar,
        BarraRegistrado,
        InformacionProfesor,
        BotonesPrivado,
        ModificarPerfil
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData"]),
  },
  created() {
    console.log(firebase.auth().currentUser)
  },
  mounted() {
    
  }
}
</script>