import { useAuthStore } from '@/stores/auth';
export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    data: () => ({
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
        dialogRecuperacion: false,
        validacionExitosa: false,
        validacionExitosa_codigo: false,
        loadingButtonValidarCorreo: false,
        loadingButtonValidarCodigo: false,
        loadingEdit: false,
        show_2: false,
        show_3: false,
        datePickerDialog: false,
        selectedDate: null,

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

            correo_electronico: null,
            contraseña: null,

            codigo_confirmacion_cuenta: null,
        },

        datos_usuario_2: {
            contraseña_recuperacion: null,
            contraseña_2: null,
        },

        datos_inicio_sesion: {
            correo_electronico_login: null,
            contraseña_login: null,
        },

        datos_recuperación: {
            correo_electronico_confirmacion: null,
        },

        datos_recuperación_2: {
            codigo_recuperacion: null,
            correo_electronico: null,
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
    }),

    watch: {
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

        abrirDialogoRecuperacion() {
            this.dialogRecuperacion = true;
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
            // if (file && file.type.startsWith('image/')) {
            //     const reader = new FileReader();
            //     reader.onload = () => {
            //         this.preview = reader.result;
            //     };
            //     reader.readAsDataURL(file);
            // }
        },

        convertirImagenPorDefectoABase64(url) {
            return fetch(url)
                .then(res => res.blob())
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }));
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

                correo_electronico: '',
                contraseña: '',

                codigo_confirmacion_cuenta: '',
            }
            this.form.error = {};
        },

        cerrarDialogLogin() {
            this.datos_inicio_sesion = {
                correo_electronico_login: '',
                contraseña_login: '',
            },
                this.form.error = {};
            this.dialogInicioSesion = false;
        },

        resetFormDialog() {
            this.dialogCodigo = false;
            this.datos_usuario.codigo_confirmacion_cuenta = '';
            this.form.error.codigo_confirmacion_cuenta = [];
        },

        login() {
            return new Promise((resolve, reject) => {
                this.loadingButtonLogin = true;
                const authStore = useAuthStore();
                if (this.datos_inicio_sesion) {
                    // console.log('Datos previos:', this.datos_inicio_sesion);
                    this.$axios.post('login', this.datos_inicio_sesion)
                        .then((response) => {
                            this.snackbar.message = 'Sesión iniciada';
                            this.snackbar.visible = true;
                            const userId = response.data.user.id;
                            const fotoPath = response.data.user.foto_path;
                            const token = response.data.accessToken;
                            const usuarioNombre = response.data.user.primer_nombre;
                            const usuarioApellido = response.data.user.primer_apellido;
                            const usuarioCorreo = response.data.user.correo_electronico;
                            authStore.storeUserId(userId);
                            authStore.storeFotoPath(fotoPath);
                            authStore.storeToken({ authToken: token });
                            authStore.storePrimerNombre(usuarioNombre);
                            authStore.storePrimerApellido(usuarioApellido);
                            authStore.storeCorreo(usuarioCorreo);
                            // console.log('id:', authStore.getUserId);
                            // console.log('Nombre:', authStore.getPrimerNombre);
                            // console.log('Apellido:', authStore.getPrimerApellido);
                            // console.log('Correo:', authStore.getCorreo);
                            this.dialogInicioSesion = false;
                            this.loadingButtonLogin = false;
                            this.form.error = {};
                            setTimeout(() => {
                                this.$router.push('/Index');
                            }, 4000);
                            resolve(response.data);
                            return;
                        })
                        .catch((error) => {
                            // this.snackbar_error.message = 'Error al iniciar sesión';
                            // this.snackbar_error.visible = true;
                            this.loadingButtonLogin = false;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status === 401) {
                                    if (error.response.data.message === 'Usuario no encontrado') {
                                        this.snackbar_error.message = this.$t('User not found');
                                    } else if (error.response.data.message === 'Contraseña incorrecta') {
                                        this.snackbar_error.message = this.$t('Incorrect password');
                                    }
                                    this.snackbar_error.visible = true;
                                } else if (error.response.status === 422) {
                                    const object = error.response.data.errors;
                                    for (const property in object) {
                                        this.form.error[property] = object[property];
                                    }
                                }
                            } else {
                                reject(error);
                                // console.error(error.message);
                            }
                        })
                        .finally(() => {
                            this.loadingButtonLogin = false;
                        });
                } else {
                    // console.error('No se puede iniciar sesión');
                    reject('No se puede iniciar sesión');
                }
            });
        },

        crearUsuario() {
            return new Promise((resolve, reject) => {
                this.loadingButtonCrear = true;

                const continuar = () => {
                    this.$axios.post('crear_usuario', this.datos_usuario)
                        .then((response) => {
                            this.loadingButtonCrear = false;
                            this.dialogCodigo = false;
                            this.resetForm();
                            this.dialogInicioSesion = true;
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonCrear = false;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status === 400) {
                                    this.form.error.codigo_confirmacion_cuenta = [error.response.data.error];
                                } else if (error.response.status === 422) {
                                    const object = error.response.data.errors;
                                    for (const property in object) {
                                        this.form.error[property] = object[property];
                                    }
                                }
                            } else {
                                reject(error);
                            }
                        });
                };

                if (!this.datos_usuario.foto_path) {
                    this.convertirImagenPorDefectoABase64(this.defaultImage)
                        .then(base64 => {
                            this.datos_usuario.foto_path = base64;
                            continuar();
                        })
                        .catch(err => {
                            console.error('Error al convertir la imagen por defecto', err);
                            continuar(); // Continúa sin imagen si falla
                        });
                } else {
                    continuar();
                }
            });
        },

        validarParaGuardar() {
            return new Promise((resolve, reject) => {
                this.loadingButtonValidar = true;

                const continuar = () => {
                    this.$axios.post(`validar_usuario`, this.datos_usuario)
                        .then((response) => {
                            this.dialogCodigo = true;
                            this.loadingButtonValidar = false;
                            this.form.error = {};
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonValidar = false;
                            this.form.error = {};
                            if (error.response) {
                                if (error.response.status === 400) {
                                    this.form.error.correo_electronico = [error.response.data.error];
                                } else if (error.response.status === 422) {
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
                };

                if (!this.datos_usuario.foto_path) {
                    this.convertirImagenPorDefectoABase64(this.defaultImage)
                        .then(base64 => {
                            this.datos_usuario.foto_path = base64;
                            continuar();
                        })
                        .catch(err => {
                            console.error('Error al convertir la imagen por defecto', err);
                            continuar(); // Continúa sin imagen si falla
                        });
                } else {
                    continuar();
                }
            });
        },

        confirmarCorreo() {
            return new Promise((resolve, reject) => {
                this.loadingButtonValidarCorreo = true;
                if (this.datos_recuperación) {
                    this.$axios.post(`validar_enviar_correo_recuperacion`, this.datos_recuperación)
                        .then((response) => {
                            this.validacionExitosa = true;
                            this.loadingButtonValidarCorreo = false;
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonValidarCorreo = false;
                            this.snackbar_error.message = this.$t('Email not found');
                            this.snackbar_error.visible = true;
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
                            this.loadingButtonValidarCorreo = false;
                        });
                } else {
                    reject('No se puede validar el correo');
                }
            });
        },

        confirmarCodigo() {
            return new Promise((resolve, reject) => {
                this.loadingButtonValidarCodigo = true;
                if (this.datos_recuperación_2) {
                    this.datos_recuperación_2.correo_electronico = this.datos_recuperación.correo_electronico_confirmacion;
                    this.$axios.post(`validar_codigo_recuperacion`, this.datos_recuperación_2)
                        .then((response) => {
                            this.validacionExitosa_codigo = true;
                            this.loadingButtonValidarCodigo = false;
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonValidarCodigo = false;
                            this.snackbar_error.message = this.$t('Incorrect code');
                            this.snackbar_error.visible = true;
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
                            this.loadingButtonValidarCodigo = false;
                        });
                } else {
                    reject('No se puede validar el código');
                }
            });
        },

        reset_correo() {
            this.datos_recuperación = {
                correo_electronico_confirmacion: null,
            }
            this.form.error = {};
        },

        reset_codigo() {
            this.datos_recuperación_2 = {
                codigo_recuperacion: null,
            }
            this.form.error = {};
        },

        reset_contraseña() {
            this.datos_usuario_2 = {
                contraseña: null,
                contraseña_2: null,
            }
            this.form.error = {};
        },

        editarContraseña() {
            return new Promise((resolve, reject) => {
                this.loadingEdit = true;
                if (this.datos_usuario_2) {
                    this.datos_usuario_2.correo_electronico = this.datos_recuperación.correo_electronico_confirmacion;
                    this.$axios.put(`editar_contraseña_recuperacion`, this.datos_usuario_2)
                        .then(response => {
                            this.loadingEdit = false;
                            this.snackbar.message = this.$t('Password edited successfully');
                            this.snackbar.visible = true;
                            this.reset_correo();
                            this.reset_codigo();
                            this.reset_contraseña();
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
    }
}
