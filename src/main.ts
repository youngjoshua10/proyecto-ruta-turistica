import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/pacifico';

import axios from './axios/axios';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { i18n } from './i18n/i18n'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        sets: {
            mdi,
        },
    },
})

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.config.globalProperties.$axios = axios;
// app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(i18n)

export { pinia };

app.mount('#app')
