<template>
    <div style="max-width: fit-content">
        <b-col>
            <b-row>
                <b-button :variant="profesor.seleccionPrivada[0] ? 'primary' : 'outline-primary'" >Modificar Perfil</b-button>
            </b-row>
            <b-row>
                <b-button :variant="profesor.seleccionPrivada[1] ? 'primary' : 'outline-primary'" >Cambiar Contraseña</b-button>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "BotonesPrivado",
  computed: {
    ...mapFields(["profesor", "profesoresDB"]),
  },
};
</script>