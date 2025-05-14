export default {
    data: () => ({
        show: false,
        panel: true,
        disabled: false,

        items: [
            {
                src: new URL('@/assets/galeria_fotos/plaza_olmedo/imagen2.png', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen_2_plaza_oomedo.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen_3_plaza_olmedo.jpg', import.meta.url).href,
            },
        ],

        items2: [
            {
                src: new URL('@/assets/fotos_ruta/imagen1_museomunicipal.jpeg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen2_museomunicipal.png', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen3_museomunicipal.jpg', import.meta.url).href,
            },
        ],

        items3: [
            {
                src: new URL('@/assets/fotos_ruta/imagen1_municipio.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen2_municipio.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/imagen3_municipio.jpg', import.meta.url).href,
            },
        ],

        items4: [
            {
                src: new URL('@/assets/fotos_ruta/fraguavualcano1.jpeg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/fraguavulcano2.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/fraguavulcano3.jpg', import.meta.url).href,
            },
        ],

        items5: [
            {
                src: new URL('@/assets/fotos_ruta/parquecentenario1.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/parquecentenario2.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/parquecentenario3.jpeg', import.meta.url).href,
            },
        ],

        items6: [
            {
                src: new URL('@/assets/fotos_ruta/cementerio1.jpeg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/cementerio2.jpg', import.meta.url).href,
            },
            {
                src: new URL('@/assets/fotos_ruta/cementerio3.jpeg', import.meta.url).href,
            },
        ],

    }),

    methods: {
        irAReservasPag() {
            this.$router.push("/Index/Reservas_Usuarios");
        },
    }
}