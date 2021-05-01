<template>
    <div>
    <b-navbar type="dark" style="background-color: #372d31">
        <b-img :src="require('@/assets/logo_TFG.png')" style="height: 50px"></b-img>

        <b-collapse is-nav style="justify-content: flex-end">
            <b-navbar-nav>
                <b-button style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px" @click="logout">Cerrar sesión</b-button>
            </b-navbar-nav>
        </b-collapse>
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