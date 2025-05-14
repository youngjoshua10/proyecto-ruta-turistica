import { useAuthStore } from '@/stores/auth';
export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    data: () => ({
        expandedIndex: null,

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
        form: {
            submit: {},
            error: {},
        },
        id: null,
        app: {
            loading: false,
        },

        show: false,
        items: [],

        selectedPago: 'efectivo',
        datePickerDialog: false,
        selectedDate: null,

        loadingButtonCrear: false,
        loadingButtonValidar: false,
        loadingMostrarReserva: false,

        dialogCrearReserva: false,
        dialogReservas: false,
        loadingCancelarReserva: false,
        dialogEliminar: false,

        itemsHora: ['07:00 am', '08:00 am', '09:00 am', '10:00 am'],
        itemsRuta: ['De poeta a patriota, la ruta del héroe'],
        itemsIidoma: ['Español', 'Inglés', 'Francés', 'Alemán'],

        datos_usuario: {
            primer_nombre: null,
            segundo_nombre: null,
            primer_apellido: null,
            segundo_apellido: null,
            numero_cedula: null,

            correo_electronico: null,
            numero_celular: null,

            fecha_tour: null,
            hora_inicio: null,
            tipo_ruta: null,
            idioma_preferencia: null,
            numero_personas: 0,
            nombre_integrantes: null,
            movilidad_discapacidad: 'N/A',

            metodo_pago_efectivo_bo: true,
            efectivo: '$9.99',

            metodo_pago_tarjeta_bo: false,
            numero_tarjeta: null,
            fecha_vencimiento: null,
            cvv: null,

            estado_reserva: true,
        },
    }),

    watch: {
        'datos_usuario.numero_personas': {
            immediate: true,
            handler(nuevaCantidad) {
                const base = 9.99;
                const total = base * (1 + Number(nuevaCantidad)); // 1 persona base + acompañantes
                this.datos_usuario.efectivo = `$${total}`;
            }
        },
        'datos_usuario.metodo_pago_efectivo_bo': function (newVal) {
            this.selectedPago = newVal ? 'efectivo' : 'tarjeta';
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
        resetForm() {
            this.datos_usuario = {
                primer_nombre: '',
                segundo_nombre: '',
                primer_apellido: '',
                segundo_apellido: '',
                numero_cedula: '',

                correo_electronico: '',
                numero_celular: '',

                fecha_tour: '',
                hora_inicio: '',
                tipo_ruta: '',
                idioma_preferencia: '',
                numero_personas: 0,
                nombre_integrantes: '',
                movilidad_discapacidad: 'N/A',

                metodo_pago_efectivo_bo: true,
                efectivo: '$9.99',

                metodo_pago_tarjeta_bo: false,
                numero_tarjeta: '',
                fecha_vencimiento: '',
                cvv: '',
            }
            this.form.error = {};
        },

        onDateSelected(value) {
            const date = new Date(value);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            this.datos_usuario.fecha_tour = `${year}-${month}-${day}`;
            this.datePickerDialog = false;
        },

        updateBooleanos() {
            if (this.selectedPago === 'efectivo') {
                this.datos_usuario.metodo_pago_efectivo_bo = true;
                this.datos_usuario.metodo_pago_tarjeta_bo = false;
            } else {
                this.datos_usuario.metodo_pago_efectivo_bo = false;
                this.datos_usuario.metodo_pago_tarjeta_bo = true;
            }
        },

        crearReserva() {
            return new Promise((resolve, reject) => {
                const token = this.authStore.getToken;

                if (!token) {
                    this.snackbar_error.message = this.$t('Failed to make request, log in first');
                    this.snackbar_error.visible = true;

                    setTimeout(() => {
                        this.$router.push('/Index/Crear_Cuenta');
                    }, 4000);

                    this.loadingButton = false;
                    return reject('Sin token');
                }
                this.loadingButtonCrear = true;
                if (this.datos_usuario) {
                    this.$axios.post('guardar_reserva', this.datos_usuario)
                        .then((response) => {
                            this.loadingButtonCrear = false;
                            this.dialogCrearReserva = false;
                            this.snackbar.message = 'Reservación guardada';
                            this.snackbar.visible = true;
                            this.resetForm();
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonCrear = false;
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
                            this.loadingButtonCrear = false;
                        });
                } else {
                    reject('No se puede guardar el producto');
                }
            });
        },

        validarReserva() {
            return new Promise((resolve, reject) => {
                const token = this.authStore.getToken;

                if (!token) {
                    this.snackbar_error.message = this.$t('Failed to make request, log in first');
                    this.snackbar_error.visible = true;

                    setTimeout(() => {
                        this.$router.push('/Index/Crear_Cuenta');
                    }, 4000);

                    this.loadingButton = false;
                    return reject('Sin token');
                }

                this.loadingButtonValidar = true;
                if (this.datos_usuario) {
                    this.$axios.post(`validar_reserva`, this.datos_usuario)
                        .then((response) => {
                            this.dialogCrearReserva = true;
                            this.loadingButtonValidar = false;
                            this.snackbar.message = 'Datos validados';
                            this.snackbar.visible = true;
                            this.form.error = {};
                            resolve(response.data);
                        })
                        .catch(error => {
                            this.loadingButtonValidar = false;
                            this.snackbar_error.message = 'Datos incorrectos';
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
                            this.loadingButtonValidar = false;
                        });
                } else {
                    reject('No se puede validar el usuario');
                }
            });
        },

        mostrarReservas() {
            return new Promise((resolve, reject) => {
                const token = this.authStore.getToken;

                if (!token) {
                    this.snackbar_error.message = this.$t('Failed to make request, log in first');
                    this.snackbar_error.visible = true;

                    setTimeout(() => {
                        this.$router.push('/Index/Crear_Cuenta');
                    }, 4000);

                    this.loadingButton = false;
                    return reject('Sin token');
                }


                this.loadingMostrarReserva = true;
                this.$axios.get(`mostrar_reserva`, {
                    params: {
                        estado_reserva: this.datos_usuario.estado_reserva !== undefined ? (this.datos_usuario.estado_reserva ? 1 : 0) : null
                    }
                })
                    .then(response => {
                        const data = response.data.reservas;
                        if (Array.isArray(data)) {
                            this.items = data;
                        } else if (data) {
                            this.items = [data];
                        } else {
                            // console.error('La propiedad "producto" no es un array ni contiene datos:', data);
                            // this.snackbar_error.message = 'La propiedad "producto" no es un array ni contiene datos';
                            // this.snackbar_error.visible = true;
                            this.items = [];
                        }
                        // console.log('Items:', this.items);
                        this.dialogReservas = true;
                        this.loadingMostrarReserva = false;
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loadingMostrarReserva = false;
                    });
            });
        },

        eliminarReserva(id) {
            return new Promise((resolve, reject) => {
                const token = this.authStore.getToken;

                if (!token) {
                    this.snackbar_error.message = this.$t('Failed to make request, log in first');
                    this.snackbar_error.visible = true;

                    setTimeout(() => {
                        this.$router.push('/Index/Crear_Cuenta');
                    }, 4000);

                    this.loadingButton = false;
                    return reject('Sin token');
                }

                this.loadingCancelarReserva = true;
                if (id) {
                    // console.log('Datos previos:', codigo_producto);
                    this.$axios.put(`eliminar_reserva/${id}`)
                        .then(response => {
                            this.dialogEliminar = false;
                            this.dialogReservas = false;
                            this.loadingCancelarReserva = false;
                            this.snackbar.message = this.$t('Reserva eliminada');
                            this.snackbar.visible = true;
                            // this.mostrarComentarios();
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al eliminar el producto:', error);
                            this.loadingCancelarReserva = false;
                            this.snackbar_error.message = this.$t('Invalid ID');
                            this.snackbar_error.visible = true;
                            reject(error);
                        })
                        .finally(() => {
                            this.loadingCancelarReserva = false;
                        });
                } else {
                    // console.error('Código de producto no válido:', codigo_producto);
                    reject('Usuario id no válido');
                }
            });
        },
    },
}
