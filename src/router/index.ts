import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Ruta_Turistica from '../views/Ruta_Turistica/Ruta_Turistica.vue'
import Index from '../views/Index/Index.vue'
import Reservas_Usuarios from '../views/Reservas_Usuarios/Reservas_Usuarios.vue'
import Crear_Cuenta from '../views/Crear_Cuenta/Crear_Cuenta.vue'
import Configuracion from '../views/Configuracion/Configuracion.vue'
import Galeria_Fotos from '../views/Galeria_Fotos/Galeria_Fotos.vue'
import Cambiar_Datos_Personales from '../views/Cambiar_Datos_Personales/Cambiar_Datos_Personales.vue'
import Cambiar_Contraseña from '../views/Cambiar_Contraseña/Cambiar_Contraseña.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Index'  // Redirige la raíz a la ruta /Index
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/Index/Ruta_Turistica',
      name: 'Ruta_Turistica',
      component: Ruta_Turistica,
    },
    {
      path: '/Index/Reservas_Usuarios',
      name: 'Reservas_Usuarios',
      component: Reservas_Usuarios,
    },
    {
      path: '/Index/Crear_Cuenta',
      name: 'Crear_Cuenta',
      component: Crear_Cuenta,
    },
    {
      path: '/Index/Configuracion',
      name: 'Configuracion',
      component: Configuracion,
    },
    {
      path: '/Index/Galeria_Fotos',
      name: 'Galeria_Fotos',
      component: Galeria_Fotos,
    },

    {
      path: '/Index/Cambiar_Datos_Personales',
      name: 'Cambiar_Datos_Personales',
      component: Cambiar_Datos_Personales,
    },

    {
      path: '/Index/Cambiar_Contraseña',
      name: 'Cambiar_Contraseña',
      component: Cambiar_Contraseña,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
