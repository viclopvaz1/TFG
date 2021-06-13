<template>
    <div>
        <b-card style="background-color: #f7f5f6; border-radius: 10px">

            <b-card-text v-if="profesor.urlArchivoHoras != ''" style="color: #858081">
                Tu PDF con tus horas está disponible <a :href="profesor.urlArchivoHoras" target="_blank" style="color: #c7b591">aquí</a> 
            </b-card-text>
            
            <b-card-text v-if="profesor.urlArchivoHoras == ''" style="color: #858081">
                No tienes ningún archivo de horas subido.
            </b-card-text>

            <b-card-text v-if="profesor.urlArchivoHoras == ''" style="color: #858081">
                Si no has subido nunca un archivo los administradores pueden no validar tus horas.
            </b-card-text>

            <form @submit.prevent="subirHoras">

                <!-- <b-form-group label="PDF del archivo de horas:" label-for="input-url" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-file id="input-url" ref="archivoHoras" placeholder="Sube un único PDF con todas tus horas" 
                        drop-placeholder="Arrastra tu PDF aquí..." :disabled="loading"
                        accept="application/pdf"
                        style="background-color: #fffcf5; border-color: #9d9d9d">
                    </b-form-file>
                </b-form-group> -->

                <b-form-group label="PDF del archivo de horas:" label-for="input-url" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-file id="input-hora" ref="archivoHoras" placeholder="Sube un único PDF con todas tus horas" 
                        drop-placeholder="Arrastra tu PDF aquí..." :disabled="loading"
                        accept="application/pdf"
                        style="background-color: #fffcf5; border-color: #9d9d9d">
                    </b-form-file>
                </b-form-group>

                <b-form-group label="Institución*:" label-for="input-institucion" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-institucion" v-model="hora.institucion" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Asignatura*:" label-for="input-asignatura" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-asignatura" v-model="hora.asignatura" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Idioma*:" label-for="input-idioma" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-idioma" v-model="hora.idioma" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Año*:" label-for="input-ano" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-ano" v-model="hora.ano" type="text" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <b-form-group label="Horas*:" label-for="input-horas" class="mt-2" label-cols-md="2" style="color: #858081">
                    <b-form-input id="input-horas" v-model.number="hora.horas" type="number" min="1" required style="background-color: #fffcf5; border-color: #9d9d9d"></b-form-input>
                </b-form-group>

                <div style="text-align: center">
                    <b-button type="submit" :disabled="loading" style="background-color: #c7b591; border-color: #c7b591; border-radius: 20px">Subir horas</b-button>
                </div>

                <b-alert v-model="horasSubidas" dismissible variant="success" class="mt-3">
                    Tus horas se han subido y un administrador las validará pronto
                </b-alert>
                
                <b-alert v-model="errorSubida" dismissible variant="danger" class="mt-3">
                    Estas horas ya han sido validadas previamente o están pendientes de validación
                </b-alert>

                <b-alert v-model="errorHoras" dismissible variant="danger" class="mt-3">
                    Las horas debe ser un número positivo.
                </b-alert>

                <b-card-text style="color: #858081">
                    *: Los campos con un asterisco son obligatorios.
                </b-card-text>
            </form>
        </b-card>
    </div>
</template>

<style>
    .btn:focus, .btn.focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(199 181 145 / 50%) !important
    }
    .custom-file-label {
        background-color: #fffcf5 !important; 
        border-color: #9d9d9d !important
    }
</style>

<script>
import {
  mapFields
} from 'vuex-map-fields'
import { mapActions} from 'vuex';
import store from '../store';
import firebase from 'firebase';

export default {
  name: "SubirHoras",
  data() {
    return {
        hora: {
            institucion: '',
            asignatura: '',
            idioma: '',
            horas: 1,
            ano: '',
            validada: 0,
            justificacionHora: ""
        },
        horasSubidas: false,
        errorSubida: false,
        errorHoras: false,
        loading: false
    }
  },
  computed: {
    ...mapFields(["profesor", "profesoresDB", "registrado", "tarjetaProfesor"]),
    ...mapActions(["getData", "updateFields"])
  },
  methods: {
      async subirHoras() {
        if (this.hora.horas === parseInt(this.hora.horas, 10) && this.hora.horas > 0) {
            this.horasSubidas = false;
            this.errorSubida = false;
            var hora = this.profesor.horas.find(element => element.asignatura == this.hora.asignatura && element.ano == this.hora.ano && element.horas == this.hora.horas && element.idioma == this.hora.idioma && element.institucion == this.hora.institucion && (element.validada == 0 || element.validada == 1));
            if (hora == undefined) {
                this.profesor.horas.push(this.hora);
                this.horasSubidas = true;
                this.hora = {
                    institucion: '',
                    asignatura: '',
                    idioma: '',
                    horas: 1,
                    ano: '',
                    validada: 0,
                    justificacionHora: ""
                }

                try {
                    const { files } = this.$refs.archivoHoras;
                    this.loading = true;
                    const file = files[0];
                    if (file) {
                        const isPdf = file.type === 'application/pdf';
                        if (isPdf) {
                            const response = await firebase
                                .storage()
                                .ref(`${this.profesor.email}/archivoHoras`)
                                .put(file);
                            const url = await response.ref.getDownloadURL();
                            this.profesor.urlArchivoHoras = url;
                            this.tarjetaProfesor.urlArchivoHoras = url;
                        } else {
                            console.log('Archivo no valido');
                        }
                    } else {
                        console.log('falta el archivo');
                    }
                } catch (error) {
                    console.error(error);
                }
                this.loading = false;
                this.update();
            } else {
                this.errorSubida = true
            }
        } else {
            this.errorHoras = true;
        } 
      },
      async update(){
        try {
            await store.dispatch('updateFields');
        } catch (error) {
            console.log(error)
        }
    }
  }
}
</script>