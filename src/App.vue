<template>
  <!-- <header class="main-container"></header> -->
  <!-- <main :class="['main-container', { 'drawer-open': drawer }]"> -->
    
    <main :class="['main-container']">
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
      >
        <v-card>
          <v-toolbar color="#0230ba">
            <v-btn
              icon="mdi-close"
              @click="dialog = false"
            ></v-btn>
            <v-toolbar-title>{{ $t('Settings') }}</v-toolbar-title>
            <v-toolbar-items>
              <v-btn
                variant="text"
                color="white"
                prepend-icon="mdi-content-save-check"
                @click="dialog = false"
              > {{ $t('Save') }}
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list lines="two">
            <v-list-subheader>{{ $t('General settings') }}</v-list-subheader>
            <v-list-item prepend-icon="mdi-alpha-e-box" @click="dialogLenguaje = true">
                <v-list-item-title>
                  {{ $t('Change') }} {{ $t('Idiom') }}
                </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="authStore.getToken" prepend-icon="mdi-account-edit" @click="obtenerParaEditarUsuario(authStore.getUserId)">
              <template #prepend>
                <v-icon v-if="!loadingEdit">mdi-account-edit</v-icon>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="primary"
                  size="20"
                ></v-progress-circular>
              </template>  
              <v-list-item-title>
                  {{ $t('Change personal data') }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-if="authStore.getToken" 
            prepend-icon="mdi-lock-reset" @click="dialogCambiarContraseña = true">
                <v-list-item-title>
                  {{ $t('Change password') }}
                </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog
      v-model="dialogDataPersonal"
      max-width="900"
      persistent
      >
        <v-card
        >
        <v-toolbar>
          <v-spacer></v-spacer>
            <v-btn
              icon="mdi-close"
              @click="dialogDataPersonal = false"
            ></v-btn>
        </v-toolbar>
          <ComponenteDatosPersonales :datosUsuario="usuarioGuardado" />
          <!-- <v-card-actions>
              <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                @click="dialogDataPersonal = false">{{ $t('Exit') }}</v-btn>
          </v-card-actions> -->
        </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogLenguaje"
      max-width="900"
      persistent
      >
        <v-card
        >
        <v-toolbar>
          <v-spacer></v-spacer>
            <v-btn
              icon="mdi-close"
              @click="dialogLenguaje = false"
            ></v-btn>
        </v-toolbar>
          <ComponenteLenguaje />
          <!-- <v-card-actions>
              <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                @click="dialogLenguaje = false">{{ $t('Exit') }}</v-btn>
          </v-card-actions> -->
        </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogCambiarContraseña"
      max-width="900"
      persistent
      >
        <v-card
        >
        <v-toolbar>
          <v-spacer></v-spacer>
            <v-btn
              icon="mdi-close"
              @click="dialogCambiarContraseña = false"
            ></v-btn>
        </v-toolbar>
          <CambiarContraseña />
          <!-- <v-card-actions>
              <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
                @click="dialogCambiarContraseña = false">{{ $t('Exit') }}</v-btn>
          </v-card-actions> -->
        </v-card>
    </v-dialog>

    <v-dialog persistent v-model="dialogCerrarSesion" max-width="500" transition="dialog-top-transition">
      <v-card>
        <v-card-title class="text-h5">{{ $t('Are you sure to log out?') }}</v-card-title>
        <v-card-text>
          <span>
            {{ $t('The session will be closed') }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" size="small" variant="flat" prepend-icon="mdi-window-close"
            @click="dialogCerrarSesion = false">{{ $t('Cancel') }}</v-btn>
          <v-btn color="success" size="small" variant="flat" prepend-icon="mdi-hand-okay" :loading="loading"
            @click="logout()">{{ $t('Confirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="drawer-container">
      <v-card class="drawer-card">
        <v-layout>

          <v-navigation-drawer v-model="drawer" :width="300" class="navigation-drawer drawer-background" app>
            <v-list-item nav>
              <div class="d-flex align-center">

                <v-list-item-content class="pl-2">
                  <!-- <pre>{{ authStore }}</pre> -->
                  <div class="d-flex align-center">
                    <v-avatar :image="authStore.getFotoPath" size="50" style="cursor: pointer"  @click="dialogFoto = true"/>
                    <v-col cols="12">
                      <v-list-item-title v-if="!authStore.getToken">{{ $t('Login now') }}</v-list-item-title>
                      <v-list-item-title v-else>
                        {{ authStore.getPrimerNombre }} {{ authStore.getPrimerApellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ authStore.getCorreo }}
                      </v-list-item-subtitle>
                    </v-col>
                  </div>

                  <v-dialog v-model="dialogFoto" width="400">
                    <template #default="{ isActive }">
                      <div
                        class="d-flex justify-center align-center"
                        style="width: 400px; height: 500px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: white;"
                      >
                        <v-img
                          :src="authStore.getFotoPath"
                          width="100%"
                          height="100%"
                          cover
                        ></v-img>
                      </div>
                    </template>
                  </v-dialog>

                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn density="compact" variant="plain" icon="mdi-dots-vertical"
                      color="black" v-bind="props">
                    </v-btn>
                    <v-btn v-if="!authStore.getToken" density="compact" variant="plain" icon="mdi-login" color="#0230ba"
                      @click="iniciarSesion()">
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-if="authStore.getToken" prepend-icon="mdi-logout" @click="dialogCerrarSesion = true">
                      <v-list-item-title>
                        {{ $t('Logout') }}
                      </v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item prepend-icon="mdi-account" @click="cuenta()">
                      <v-list-item-title>
                        Cuenta
                      </v-list-item-title>
                    </v-list-item> -->
                    <v-list-item prepend-icon="mdi-cog" @click="dialog = true">
                      <v-list-item-title>
                        {{ $t('Settings') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
              <v-list-item v-for="item in menuItems" :key="item.value" :prepend-icon="item.icon" :title="item.title"
                @click="navigate(item.route)" :class="{ active: $route.path === item.route }">
              </v-list-item>
            </v-list>
          </v-navigation-drawer>


          <div class="parallax-container">
            <v-container fluid>
              <v-col cols="12" class="d-flex justify-space-between align-center">
                <v-btn class="mt-16" color="#0230ba" size="small" variant="flat" prepend-icon="mdi-menu" @click.stop="drawer = !drawer">
                  {{ $t('Menu') }}
                </v-btn>

                <v-avatar color="info" size="130" @click="dialogFotoLogo = true"
                  style="cursor: pointer">
                  <v-img
                    alt="Logo del proyecto"
                    src="/logo_proyecto/logoproyecto.jpg"
                  ></v-img>
                </v-avatar>

                <v-dialog v-model="dialogFotoLogo" width="400">
                    <template #default="{ isActive }">
                      <div
                        class="d-flex justify-center align-center"
                        style="width: 400px; height: 500px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: white;"
                      >
                        <v-img
                          src="/logo_proyecto/logoproyecto.jpg"
                          width="100%"
                          height="100%"
                          cover
                        ></v-img>
                      </div>
                    </template>
                  </v-dialog>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="12">
                <router-view />
              </v-col>
            </v-container>
          </div>
          <!-- <v-navigation-drawer v-model="drawer" :rail="rail" @click="rail = false" :width="180"
        class="navigation-drawer"> -->
        </v-layout>
      </v-card>
    </div>

    <br>
  </main>
 
</template>

<script>
import { useAuthStore } from '@/stores/auth';
// const authStore = useAuthStore();
// import pinia from '@/pinia'
import { RouterLink, RouterView } from 'vue-router'
import ComponenteLenguaje from './views/Configuracion/Configuracion.vue'
import ComponenteDatosPersonales from './views/Cambiar_Datos_Personales/Cambiar_Datos_Personales.vue'
import CambiarContraseña from './views/Cambiar_Contraseña/Cambiar_Contraseña.vue'

// import logo from '@/assets/logo_proyecto/logoproyecto.jpg';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  components: {
    ComponenteLenguaje,
    ComponenteDatosPersonales,
    CambiarContraseña
  },

  data() {
    return {
      // authStore: null,
      dialogFoto: false,
      dialogLenguaje: false,
      dialogDataPersonal: false,
      dialog: false,
      drawer: true,
      loadingEdit: false,
      dialogCambiarContraseña: false,
      dialogFotoLogo: false,
      // loadingEditData: false,
      rail: true,
      loading: false,
      dialogCerrarSesion: false,
      usuarioGuardado: {},
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

  // mounted() {
  //   console.log('Token:', this.authStore.getToken);
  //   console.log('Nombre:', this.authStore.getPrimerNombre);
  //   console.log('Apellido:', this.authStore.getPrimerApellido);
  //   console.log('Correo:', this.authStore.getCorreo);
  // },

  computed: {
    menuItems() {
      return [
        ...([{ icon: 'mdi-home-circle', title: this.$t('Home'), value: 'index', route: '/Index' }]),
        ...([{ icon: 'mdi-truck-off-road', title: this.$t('Tourist route'), value: 'Ruta_Turistica', route: '/Index/Ruta_Turistica' }]),
        ...([{ icon: 'mdi-note-check', title: this.$t('Reservations'), value: 'reservas', route: '/Index/Reservas_Usuarios' }]),
        ...([{ icon: 'mdi-image-multiple', title: this.$t('Photo Gallery'), value: 'galeria_fotos', route: '/Index/Galeria_Fotos' }]),
      ];
    },
  },

  methods: {
    navigate(route) {
      this.$router.push(route)
    },

    iniciarSesion() {
      this.$router.push("/Index/Crear_Cuenta");
    },

    configuracion() {
      this.$router.push("/Index/Configuracion");
    },

    logout() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        const authStore = useAuthStore();
        this.$axios.get('logout')
          .then(response => {
            // console.log('Sesión finalizada:', response);
            // this.loading = false;
            authStore.logout();
            this.loading = false;
            this.dialogCerrarSesion = false;
            this.snackbar.message = 'Sesión finalizada';
            this.snackbar.visible = true;
            setTimeout(() => {
              this.$router.push('/Index/Crear_Cuenta');
            }, 4000);
            resolve(response.data);
            return;
          })
          .catch(error => {
            // console.error('Error al cerrar sesión:', error);
            this.loading = false;
            this.dialogCerrarSesion = false;
            this.snackbar_error.message = 'Error al finalizar la sesión';
            this.snackbar_error.visible = true;
            reject(error);
          })
          .finally(() => {
            this.loading = false;
            this.dialogCerrarSesion = false;
          });
      });
    },



    obtenerParaEditarUsuario(id) {
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
                    this.$axios.get(`obtener_usuario/${id}`)
                        .then(response => {
                            this.usuarioGuardado = response.data.usuario;
                            this.loadingEdit = false;
                            this.dialogDataPersonal = true;
                            resolve(response.data);
                        })
                        .catch(error => {
                            // console.error('Error al obtener el producto:', error);
                            this.loadingEdit = false;
                            this.snackbar_error.message = this.$t('No se puede obtener el usuario');
                            this.snackbar_error.visible = true;
                            reject(error);
                        })
                        .finally(() => {
                            this.loadingEdit = false;
                        });
                } else {
                    // console.error('No se puede obtener el producto');
                    reject('No se puede obtener el usuario');
                }
            });
        },


  },

  // created() {
  //   this.authStore = useAuthStore();
  // },
}
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  /* padding: 0; */
  /* height: 100vh; */
  width: 200%;
  margin: 0;
  /* overflow-x: auto;
  overflow-y: auto;
  overflow: hidden; */
  transition: margin-left 0.3s ease;
  margin-left: 0px;
  align-items: flex-start;
  /* Alinea el contenido al lado izquierdo */
  justify-content: flex-start;
  /* Alinea el contenido al inicio vertical */
}

.drawer-container {
  display: flex;
  /* width: 100%; */
  flex: 1;
  overflow: hidden;
  /* justify-content: center; */
}

.drawer-background {
  position: relative;
  overflow: hidden;
}

.drawer-background::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/logo_proyecto/josejoaquindrawer.jpg'); /* Usa aquí tu imagen */
  background-size: cover;
  background-position: center;
  opacity: 0.2; /* Controla qué tan opaca está la imagen */
  z-index: 0;
}

.drawer-background > * {
  position: relative;
  z-index: 1; /* Para que el contenido esté encima del fondo */
}

/* .drawer-card {
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
} */

/* .navigation-drawer {
  background-color: #f7f7f7;
  min-height: 100vh;
  /* min-width: 240px; 
  transition: width 0.3s ease;
} */

/* .v-navigation-drawer--rail {
  width: 56px !important;
} */

.v-list-item.active {
  background-color: #0230ba;
  color: rgb(0, 0, 0);
}

.v-list-item.active .v-icon {
  color: rgb(0, 0, 0);
}

.v-list-item:hover {
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.parallax-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* Permite el scroll si el contenido es más grande */
}

.drawer-open {
  margin-left: 100px;
  /* El mismo ancho que tu v-navigation-drawer */
}

.dynamic-content {
  display: flex;
  /* flex-direction: column; */
  flex: 1;
  /* Ocupa el espacio disponible */
  padding: 16px;
  /* Ajusta el padding según tus necesidades */
  overflow: auto;
  /* Permite el scroll si el contenido es más grande */
}

/* .menu-button {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
} */

/* .parallax-container {
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  /* width: 100%; */
/* transition: width 0.3s ease; 
} */
</style>
