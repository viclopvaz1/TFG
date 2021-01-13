<template>
  <div>
    <BarraSinRegistrar v-if="!registrado"/>
    <BarraRegistrado v-if="registrado"/>
    
    <InformacionProfesor/>
  </div>
</template>

<script>
import BarraSinRegistrar from "@/components/BarraSinRegistrar.vue";
import BarraRegistrado from "@/components/BarraRegistrado.vue";
import InformacionProfesor from "@/components/InformacionProfesor.vue";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import store from "../store";

export default {
  name: "PaginaPrincipal",
  components: {
    BarraSinRegistrar,
    BarraRegistrado,
    InformacionProfesor
  },
  data() {
    return {};
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado"]),
    ...mapActions(["getData"]),
  },
  created() {
    //Para que se actualice la lista profesoresDB con todos los profesores en la base
    //de datos
    store.dispatch("getData");
    //store.dispatch('updateFields');
  },
  methods: {},
};
</script>
