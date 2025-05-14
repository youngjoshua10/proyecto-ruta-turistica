import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            userId: null,
            foto_path: null,
            token: {
                authToken: null,
            },
            primer_nombre: null,
            primer_apellido: null,
            correo_electronico: null,
        }
    }),

    getters: {
        getUserId: (state) => state.user.userId,

        getFotoPath: (state) => state.user.foto_path,
        getToken: (state) => state.user.token?.authToken || null,
        getPrimerNombre: (state) => state.user.primer_nombre,
        getPrimerApellido: (state) => state.user.primer_apellido,
        getCorreo: (state) => state.user.correo_electronico,

        sesionActiva: (state) => state.user.token !== null,
    },

    actions: {
        storeUserId(userr) {
            this.user.userId = userr;
        },

        storeFotoPath(foto) {
            this.user.foto_path = foto;
        },
        storeToken(token) {
            this.user.token = token;
        },
        storePrimerNombre(nombre) {
            this.user.primer_nombre = nombre;
        },
        storePrimerApellido(apellido) {
            this.user.primer_apellido = apellido;
        },
        storeCorreo(correo) {
            this.user.correo_electronico = correo;
        },

        logout() {
            this.user = {
                userId: null,
                foto_path: null,
                token: { authToken: null },
                primer_nombre: null,
                primer_apellido: null,
                correo_electronico: null,
            };
        },
    },
    persist: true,
    // persist: {
    //     paths: ['user.token', 'user.primer_nombre', 'user.primer_apellido', 'user.correo_electronico'],
    //   }
});