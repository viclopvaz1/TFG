<template>
    <div>
    <b-navbar type="dark" variant="info">
        <b-nav-text>Logo</b-nav-text>

        <b-button variant="primary" @click="logout">Logout</b-button>
    </b-navbar>
    </div>
</template>

<script>
import firebase from 'firebase';
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';

export default {
    name: "BarraAdmin",
    computed: {
        ...mapFields(["profesor", "profesoresDB", "registrado", "administrador"]),
        ...mapActions(['getData'])
    },
    methods: {
        logout() {
            this.administrador.email = '';
            this.administrador.contrasena = '';

            this.registrado = false;
            firebase.auth().signOut().then(() => this.$router.replace('login'));
        },
    }
}
</script>