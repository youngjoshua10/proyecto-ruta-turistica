export default {
    data() {
        return {
            dialog: false,
            selectedImage: null,
            imagenes1: [
                {
                    id: 1,
                    src: new URL('@/assets/galeria_fotos/plaza_olmedo/vertical_1.jpg', import.meta.url).href,
                    alt: 'Imagen 1',
                    texto: 'Review'
                },
                {
                    id: 2,
                    src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen2.png', import.meta.url).href, alt: 'Imagen 2',
                    texto: 'Review'
                },
                {
                    id: 3,
                    src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen3.jpg', import.meta.url).href,
                    alt: 'Imagen 3',
                    texto: 'Review'
                },
                {
                    id: 4,
                    src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen4.jpg', import.meta.url).href,
                    alt: 'Imagen 4',
                    texto: 'Review'
                },
            ],

            imagenes2: [
                {
                    id: 1,
                    src: new URL('@/assets/galeria_fotos/museo_municipal/imagen1.jpeg', import.meta.url).href,
                    alt: 'Imagen 1',
                    texto: 'Review'
                },
                {
                    id: 2,
                    src: new URL('@/assets/galeria_fotos/museo_municipal/imagen2.jpg', import.meta.url).href, alt: 'Imagen 2',
                    texto: 'Review'
                },
                {
                    id: 3,
                    src: new URL('@/assets/galeria_fotos/museo_municipal/imagen3.jpg', import.meta.url).href,
                    alt: 'Imagen 3',
                    texto: 'Review'
                },
                {
                    id: 4,
                    src: new URL('@/assets/galeria_fotos/museo_municipal/imagen4.jpeg', import.meta.url).href,
                    alt: 'Imagen 4',
                    texto: 'Review'
                },
            ],

            imagenes3: [
                // {
                //     id: 1,
                //     src: new URL('@/assets/galeria_fotos/municipio_guayaquil/imagen1.jpg', import.meta.url).href,
                //     alt: 'Imagen 1',
                //     texto: 'Review'
                // },
                // {
                //     id: 2,
                //     src: new URL('@/assets/galeria_fotos/municipio_guayaquil/imagen4.jpg', import.meta.url).href,                    alt: 'Imagen 2',
                //     texto: 'Review'
                // },
                {
                    id: 3,
                    src: new URL('@/assets/galeria_fotos/municipio_guayaquil/municipionuevo.jpg', import.meta.url).href,
                    alt: 'Imagen 3',
                    texto: 'Review'
                },
                {
                    id: 4,
                    src: new URL('@/assets/galeria_fotos/municipio_guayaquil/imagen2.jpg', import.meta.url).href,
                    alt: 'Imagen 4',
                    texto: 'Review'
                },
            ],

            imagenes4: [
                {
                    id: 1,
                    src: new URL('@/assets/galeria_fotos/plaza_administracion/plazanuevo.jpg', import.meta.url).href,
                    alt: 'Imagen 1',
                    texto: 'Review'
                },
                {
                    id: 2,
                    src: new URL('@/assets/galeria_fotos/plaza_administracion/plazanuevo2.jpg', import.meta.url).href, alt: 'Imagen 2',
                    texto: 'Review'
                },
                // {
                //     id: 3,
                //     src: new URL('@/assets/galeria_fotos/municipio_guayaquil/imagen3.jpg', import.meta.url).href,
                //     alt: 'Imagen 3',
                //     texto: 'Review'
                // },
                // {
                //     id: 4,
                //     src: new URL('@/assets/galeria_fotos/municipio_guayaquil/imagen2.jpg', import.meta.url).href,
                //     alt: 'Imagen 4',
                //     texto: 'Review'
                // },
            ],

            imagenes5: [
                // {
                //     id: 1,
                //     src: new URL('@/assets/galeria_fotos/plaza_administracion/imagen1.jpeg', import.meta.url).href,
                //     alt: 'Imagen 1',
                //     texto: 'Review'
                // },
                // {
                //     id: 2,
                //     src: new URL('@/assets/galeria_fotos/plaza_administracion/imagen2.jpg', import.meta.url).href,                    alt: 'Imagen 2',
                //     texto: 'Review'
                // },
                {
                    id: 3,
                    src: new URL('@/assets/galeria_fotos/parque_centenario/imagen2.jpg', import.meta.url).href,
                    alt: 'Imagen 3',
                    texto: 'Review'
                },
                {
                    id: 4,
                    src: new URL('@/assets/galeria_fotos/parque_centenario/imagen1.jpg', import.meta.url).href,
                    alt: 'Imagen 4',
                    texto: 'Review'
                },
            ],

            imagenes6: [
                {
                    id: 1,
                    src: new URL('@/assets/galeria_fotos/cementerio_general/cementerionuevo2.jpg', import.meta.url).href,
                    alt: 'Imagen 1',
                    texto: 'Review'
                },
                {
                    id: 2,
                    src: new URL('@/assets/galeria_fotos/cementerio_general/imagen2.jpg', import.meta.url).href, alt: 'Imagen 2',
                    texto: 'Review'
                },
                {
                    id: 3,
                    src: new URL('@/assets/galeria_fotos/cementerio_general/cementerionuevo.jpg', import.meta.url).href,
                    alt: 'Imagen 3',
                    texto: 'Review'
                },
                {
                    id: 4,
                    src: new URL('@/assets/galeria_fotos/cementerio_general/imagen4.jpg', import.meta.url).href,
                    alt: 'Imagen 4',
                    texto: 'Review'
                },
            ],
        }
    },

    // setup() {
    //     const imageLayout = ref([
    //         {
    //             cols: 4,
    //             src: new URL('@/assets/galeria_fotos/plaza_olmedo/vertical_1.jpg', import.meta.url).href,
    //         },
    //         {
    //             cols: 8,
    //             children: [
    //                 { cols: 12, src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen2.png', import.meta.url).href },
    //                 { cols: 12, src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen3.jpg', import.meta.url).href },
    //             ],
    //         },
    //         {
    //             cols: 6,
    //             src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen4.jpg', import.meta.url).href,
    //         },
    //         { cols: 3},
    //         { cols: 9 },
    //         { cols: 4 },
    //         { cols: 8 },
    //     ])

    //     return {
    //         imageLayout,
    //     }
    // }

    methods: {
        translate(key) {
            if (typeof key === 'string') {
                return this.$t(key)
            }
            return ''
        },

        openDialog(imageSrc) {
            this.selectedImage = imageSrc
            this.dialog = true
        },
    },
}