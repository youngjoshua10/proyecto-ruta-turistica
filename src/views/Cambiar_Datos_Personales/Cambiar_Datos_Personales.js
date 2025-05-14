import api from '@/axios/axios';
import { useAuthStore } from '@/stores/auth';
export default {
    data() {
        return {
            preview: null,
            defaultImage: new URL('@/assets/foto_perfil/foto-perfil.jpg', import.meta.url).href,
            selectedSexo: 'hombre',
            form: {
                submit: {},
                error: {},
            },
            id: null,
            app: {
                loading: false,
            },
            dialogInicioSesion: false,
            dialogCodigo: false,
            show_dos: false,
            show: false,
            loadingButtonValidar: false,
            loadingButtonCrear: false,
            loadingButtonLogin: false,
            loadingEdit: false,
            datePickerDialog: false,
            selectedDate: null,
            numero_celular_visible: '',

            datos_usuario: {
                foto_path: null,
                primer_nombre: null,
                segundo_nombre: null,
                primer_apellido: null,
                segundo_apellido: null,
                numero_celular: null,
                fecha_nacimiento: null,
                sexo_hombre_bo: true,
                sexo_mujer_bo: false,
                // correo_electronico: null,
                // contraseña: null,
                // codigo_confirmacion_cuenta: null,
            },
            datos_usuario_confirmacion: {
                contraseña: null,
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
            datos_usuario: this.datosUsuario || {},
            dialogConfirmarContraseña: false,

            // numeroCelular: null,
        }
    },

    // computed: {
    //     numeroCelular: {
    //         get() {
    //             const numero = String(this.datos_usuario.numero_celular || '');
    //             return numero.startsWith('0') ? numero : '0' + numero;
    //         },
    //         set(value) {
    //             // Guarda el número sin ceros al principio
    //             this.datos_usuario.numero_celular = value;
    //         }
    //     }
    // },

    watch: {
        'datos_usuario.numero_celular': {
            immediate: true,
            handler(nuevo) {
                const numero = String(nuevo || ''); // Asegura que sea string
                this.numero_celular_visible = numero.startsWith('0') ? numero : '0' + numero;
            }
        },
        numero_celular_visible(nuevo) {
            this.datos_usuario.numero_celular = nuevo;
        },


        'datos_usuario.sexo_hombre_bo': function (newVal) {
            this.selectedSexo = newVal ? 'hombre' : 'mujer';
        },
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

        datosUsuario: {
            immediate: true,
            handler(nuevo) {
                if (nuevo) {
                    this.usuario = nuevo;

                    if (nuevo.sexo_hombre_bo) {
                        this.selectedSexo = 'hombre';
                    } else if (nuevo.sexo_mujer_bo) {
                        this.selectedSexo = 'mujer';
                    }
                }
            }
        }
    },

    props: {
        datosUsuario: {
            type: Object,
            required: true
        }
    },

    methods: {
        onDateSelected(value) {
            const date = new Date(value);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            this.datos_usuario.fecha_nacimiento = `${year}-${month}-${day}`;
            this.datePickerDialog = false;
        },

        triggerFileSelect() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.datos_usuario.foto_path = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },

        updateBooleanos() {
            if (this.selectedSexo === 'hombre') {
                this.datos_usuario.sexo_hombre_bo = true;
                this.datos_usuario.sexo_mujer_bo = false;
            } else {
                this.datos_usuario.sexo_hombre_bo = false;
                this.datos_usuario.sexo_mujer_bo = true;
            }
        },

        cancelarDialog() {
            this.dialog = false;
            this.resetForm();
        },

        resetForm() {
            this.datos_usuario = {
                primer_nombre: '',
                segundo_nombre: '',
                primer_apellido: '',
                segundo_apellido: '',

                numero_celular: '',
                fecha_nacimiento: '',

                sexo_hombre_bo: true,
                sexo_mujer_bo: false,
            }
            this.form.error = {};
        },

        resetFormDialog() {
            this.dialogConfirmarContraseña = false;
            this.datos_usuario_confirmacion.contraseña = '';
            this.form.error.contraseña = [];
        },

        validarParaGuardar() {
            return new Promise((resolve, reject) => {
                this.loadingButtonValidar = true;
                if (this.datos_usuario) {
                    // console.log('Datos previos:', this.datos_usuario);
                    this.$axios.post(`validad_antes_editar_usuario/${this.datos_usuario.id}`, this.datos_usuario)
                        .then((response) => {
                            // console.log(response.data);
                            this.dialogConfirmarContraseña = true;
                            this.loadingButtonValidar = false;
                            this.snackbar.message = 'Validated data';
                            this.snackbar.visible = true;
                            this.form.error = {};
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al validar el usuario:', error);
                            this.loadingButtonValidar = false;
                            // this.snackbar_error.message = 'Datos incorrectos';
                            // this.snackbar_error.visible = true;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status == 422) {
                                    const object = error.response.data.errors;
                                    for (const property in object) {
                                        this.form.error[property] = object[property];
                                    }
                                }
                                // this.$store.dispatch("app/storeSnackbar", {
                                //     visible: true,
                                //     content: error.response.data.message,
                                //     color: "red",
                                // });
                            } else {
                                // console.error(error.message);
                                reject(error);
                            }
                        })
                        .finally(() => {
                            this.loadingButtonValidar = false;
                        });
                } else {
                    // console.error('No se puede validar el usuario');
                    reject('No se puede validar el usuario');
                }
            });
        },


        editarUsuario() {
            return new Promise((resolve, reject) => {
                this.loadingEdit = true;
                const authStore = useAuthStore();
                if (this.datos_usuario) {
                    const payload = {
                        ...this.datos_usuario,
                        contraseña: this.datos_usuario_confirmacion.contraseña
                    };
                    this.$axios.put(`editar_usuario/${this.datos_usuario.id}`, payload)
                        .then(response => {
                            console.log(this.datos_usuario.foto_path);
                            const fotoPath = response.data.usuario.foto_path;
                            const usuarioNombre = response.data.usuario.primer_nombre;
                            const usuarioApellido = response.data.usuario.primer_apellido;
                            authStore.storeFotoPath(fotoPath);
                            authStore.storePrimerNombre(usuarioNombre);
                            authStore.storePrimerApellido(usuarioApellido);
                            this.dialogConfirmarContraseña = false;
                            this.loadingEdit = false;
                            this.snackbar.message = this.$t('User edited correctly');
                            this.snackbar.visible = true;
                            this.resetFormDialog();
                            // this.mostrarComentarios();
                            // this.resetForm();
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al actualizar el comentario:', error);
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



    }
}
