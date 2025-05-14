import guayaquilImg from '@/assets/banner.png';
import api from '@/axios/axios';
import { useAuthStore } from '@/stores/auth';

export default {

    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },

    data: () => ({
        imagenes: [
            {
                id: 1,
                src: new URL('@/assets/portada/protada-1.jpeg', import.meta.url).href,
                alt: 'Imagen 1',
                route: '/Index/Ruta_Turistica',
                texto: 'Review Route: From poet to patriot, the hero´s journey'
            },
            {
                id: 2,
                src: new URL('@/assets/portada/portada-2.jpg', import.meta.url).href,
                alt: 'Imagen 2',
                route: '/Index/Ruta_Turistica',
                texto: 'Review Route: From poet to patriot, the hero´s journey'
            },
            {
                id: 3,
                src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen2.png', import.meta.url).href, alt: 'Imagen 2',
                alt: 'Imagen 3',
                route: '/Index/Galeria_Fotos',
                texto: 'Plaza Olmedo - Olmedo Monument'
            },
            {
                id: 4,
                src: new URL('@/assets/galeria_fotos/museo_municipal/imagen1.jpeg', import.meta.url).href,
                alt: 'Imagen 4',
                route: '/Index/Galeria_Fotos',
                texto: 'Municipal Museum - Works of Olmedo'
            },
            {
                id: 5,
                src: new URL('@/assets/galeria_fotos/municipio_guayaquil/municipionuevo.jpg', import.meta.url).href,
                alt: 'Imagen 5',
                route: '/Index/Galeria_Fotos',
                texto: 'Municipality of the Mayor´s Office of Guayaquil - Olmedo´s Armchair'
            },
            {
                id: 6,
                src: new URL('@/assets/galeria_fotos/plaza_administracion/plazanuevo.jpg', import.meta.url).href,
                alt: 'Imagen 6',
                route: '/Index/Galeria_Fotos',
                texto: 'Administration Position - Fragua Vulcano'
            },
            {
                id: 7,
                src: new URL('@/assets/galeria_fotos/parque_centenario/imagen2.jpg', import.meta.url).href,
                alt: 'Imagen 7',
                route: '/Index/Galeria_Fotos',
                texto: 'Centennial Park - Column of Heroes of October 9'
            },
            {
                id: 8,
                src: new URL('@/assets/galeria_fotos/cementerio_general/tumbaolmedo.jpg', import.meta.url).href,
                alt: 'Imagen 8',
                route: '/Index/Galeria_Fotos',
                texto: 'General Cemetery of Guayaquil - Olmedo´s Tomb'
            },
            // { id: 9, src: 'https://wallpaperaccess.com/full/2333175.jpg', alt: 'Imagen 9' },
        ],

        items: [],
        items2: [],
        form: {
            submit: {},
            errorGuardar: {
                contenido: null
            },
            errorEditar: {
                contenido: null
            },
        },
        id: null,
        app: {
            loading: false,
        },
        show: false,
        guayaquilImg,
        loadingButton: false,
        icons: [
            // { icon: 'mdi-facebook', url: 'https://www.facebook.com/TuPagina' },
            // { icon: 'mdi-twitter', url: 'https://twitter.com/TuPerfil' },
            // { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/TuPerfil' },
            { icon: 'mdi-instagram', url: 'https://www.instagram.com/larutadeunheroe/profilecard/?igsh=MW5tYXBveDh2NWZwZQ==' },
        ],

        comentarios_testimonios: {
            usuario_id: null,
            contenido: null,
            rating: 1,
            estado_contenido: true,
        },

        comentarios_testimonios2: {
            usuario_id: null,
            contenido: null,
            rating: 1,
            estado_contenido: true,
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
        dialogDelete: null,
        dialogEdit: null,

        loadingDelete: false,
        loadingEdit: false,

        comentarioSeleccionadoId: null,
    }),

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

    mounted() {
        this.mostrarComentarios();
    },

    methods: {

        abrirDialogoEliminar(id) {
            this.comentarioSeleccionadoId = id;
            this.dialogDelete = true;
        },

        reset() {
            this.comentarios_testimonios = {
                usuario_id: '',
                contenido: '',
                rating: 1,
                estado_contenido: true,
            }
            this.form.errorGuardar = {};
        },

        translate(key) {
            if (typeof key === 'string') {
                return this.$t(key)
            }
            return ''
        },

        mostrarComentarios() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                this.$axios.get('mostrar_comentarios', {
                    params: {
                        estado_contenido: this.comentarios_testimonios.estado_contenido !== undefined ? (this.comentarios_testimonios.estado_contenido ? 1 : 0) : null
                    }
                })
                    .then(response => {
                        const data = response.data.comentario;
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
                        this.loading = false;
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },

        obtenerParaEditarComentario(id) {
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

                this.loadingEdit = true;
                if (id) {
                    // console.log('Datos previos:', codigo_producto);
                    this.$axios.get(`obtener_comentario/${id}`)
                        .then(response => {
                            this.comentarios_testimonios2 = response.data.comentario;
                            this.loadingEdit = false;
                            this.dialogEdit = true;
                            this.form.errorEditar.contenido = null;
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al obtener el producto:', error);
                            this.loadingEdit = false;
                            this.snackbar_error.message = this.$t('The comment cannot be obtained.');
                            this.snackbar_error.visible = true;
                            reject(error);
                        })
                        .finally(() => {
                            this.loadingEdit = false;
                        });
                } else {
                    // console.error('No se puede obtener el producto');
                    reject('No se puede obtener el comentario');
                }
            });
        },

        editarComentario() {
            return new Promise((resolve, reject) => {
                this.loadingEdit = true;
                if (this.comentarios_testimonios2) {
                    this.$axios.put(`editar_comentario/${this.comentarios_testimonios2.id}`, this.comentarios_testimonios2)
                        .then(response => {
                            this.dialogEdit = false;
                            this.loadingEdit = false;
                            this.snackbar.message = this.$t('Comment edited correctly');
                            this.snackbar.visible = true;
                            this.mostrarComentarios();
                            this.form.errorEditar = {};
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al actualizar el comentario:', error);
                            this.loadingEdit = false;
                            if (!this.comentarios_testimonios2.contenido || this.comentarios_testimonios2.contenido.trim() === '') {
                                this.form.errorEditar.contenido = [this.$t('The comment field is required')];
                                // this.loadingButton = false;
                                return reject('Campo vacío');
                            }
                            reject(error);
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

        guardarComentario() {
            return new Promise((resolve, reject) => {
                this.loadingButton = true;

                this.$nextTick(() => {
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

                    if (this.comentarios_testimonios) {

                        api.post('guardar_comentario', this.comentarios_testimonios)
                            .then((response) => {
                                // this.form.error = {};
                                this.snackbar.message = this.$t('Commented correctly');;
                                this.snackbar.visible = true;
                                // this.form.errorGuardar = {};
                                this.reset();
                                this.mostrarComentarios();
                                resolve(response.data);
                            })
                            .catch(error => {
                                if (!this.comentarios_testimonios.contenido || this.comentarios_testimonios.contenido.trim() === '') {
                                    this.form.errorGuardar.contenido = [this.$t('The comment field is required')];
                                    this.loadingButton = false;
                                    return reject('Campo vacío');
                                }
                                reject(error);
                            })
                            .finally(() => {
                                this.loadingButton = false;
                            });
                    } else {
                        this.loadingButton = false;
                        reject('No se puede guardar el comentario');
                    }
                });
            });
        },

        IrRuta() {
            this.$router.push("/Index/Ruta_Turistica");
        },

        BorrarComentario(id) {
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

                this.loadingDelete = true;
                if (id) {
                    // console.log('Datos previos:', codigo_producto);
                    this.$axios.put(`eliminar_comentario/${id}`)
                        .then(response => {
                            this.dialogDelete = false;
                            this.loadingDelete = false;
                            this.snackbar.message = this.$t('Comment deleted successfully');
                            this.snackbar.visible = true;
                            this.mostrarComentarios();
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al eliminar el producto:', error);
                            this.loadingDelete = false;
                            this.snackbar_error.message = this.$t('Invalid ID');
                            this.snackbar_error.visible = true;
                            reject(error);
                        })
                        .finally(() => {
                            this.loadingDelete = false;
                        });
                } else {
                    // console.error('Código de producto no válido:', codigo_producto);
                    reject('Usuario id no válido');
                }
            });
        },
    }
}
