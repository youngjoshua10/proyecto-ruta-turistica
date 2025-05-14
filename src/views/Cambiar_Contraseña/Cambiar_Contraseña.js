import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
export default {

    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    data() {
        return {
            form: {
                submit: {},
                error: {},
            },
            id: null,
            app: {
                loading: false,
            },

            loadingButtonValidar: false,
            validacionExitosa: false,
            loadingEdit: false,
            show: false,
            show_2: false,
            show_3: false,

            datos_usuario: {
                // foto_path: null,
                // primer_nombre: null,
                // segundo_nombre: null,
                // primer_apellido: null,
                // segundo_apellido: null,
                // numero_celular: '0',
                // fecha_nacimiento: null,
                // sexo_hombre_bo: true,
                // sexo_mujer_bo: false,
                // correo_electronico: null,
                contraseña: null,
                contraseña_2: null,
                // codigo_confirmacion_cuenta: null,
            },
            datos_usuario_confirmacion: {
                contraseña_confirmacion: null,
            },
            snackbar: {
                visible: false,
                message: '',
                color: 'green',
                timeout: 4000
            },

            snackbar_error: {
                visible: false,
                message: '',
                color: 'error',
                timeout: 4000
            },
        }
    },

    watch: {
        item: {
            handler: function (object) {
                for (const property in object) {
                    if (!this.item[property] == "") {
                        this.form.error[property] = "";
                    }
                }
            },
            deep: true,
        },
    },

    methods: {
        reset() {
            this.datos_usuario_confirmacion = {
                contraseña_confirmacion: null,
            }
            this.form.error = {};
        },

        reset_2() {
            this.datos_usuario = {
                contraseña: null,
                contraseña_2: null,
            }
            this.form.error = {};
        },

        confirmarContraseña(id) {
            return new Promise((resolve, reject) => {
                this.loadingButtonValidar = true;
                if (this.datos_usuario_confirmacion) {
                    this.$axios.post(`validad_contraseña_confirmacion/${id}`, this.datos_usuario_confirmacion)
                        .then((response) => {
                            this.loadingButtonValidar = false;
                            this.validacionExitosa = true;
                            this.reset();
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonValidar = false;
                            this.validacionExitosa = false;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status == 422) {
                                    const object = error.response.data.errors;
                                    for (const property in object) {
                                        this.form.error[property] = object[property];
                                    }
                                }
                            } else {
                                reject(error);
                            }
                        })
                        .finally(() => {
                            this.loadingButtonValidar = false;
                        });
                } else {
                    reject('No se puede validar el usuario');
                }
            });
        },

        editarContraseña(id) {
            return new Promise((resolve, reject) => {
                this.loadingEdit = true;
                if (this.datos_usuario) {
                    this.$axios.put(`editar_contraseña/${id}`, this.datos_usuario)
                        .then(response => {
                            this.loadingEdit = false;
                            this.snackbar.message = this.$t('Password edited successfully');
                            this.snackbar.visible = true;
                            this.reset_2();
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingEdit = false;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status == 422) {
                                    const object = error.response.data.errors;
                                    for (const property in object) {
                                        this.form.error[property] = object[property];
                                    }
                                }
                            } else {
                                // console.error(error.message);
                                reject(error);
                            }
                        })
                        .finally(() => {
                            this.loadingEdit = false;
                            // this.mostrarProducto();
                        });
                } else {
                    // console.error('No se puede editar');
                    reject('No se puede editar');
                }
            });
        },

    },
}