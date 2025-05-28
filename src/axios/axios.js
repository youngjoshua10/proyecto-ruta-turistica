import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { pinia } from '@/main';
// import { createPinia } from 'pinia';
// const pinia = createPinia();
// import store from '@/store/store';

const instance = axios.create({
  baseURL: 'https://thin-mangos-visit.loca.lt/api/',
  // baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    'bypass-tunnel-reminder': 'true', // <- este es el que LocalTunnel reconoce
    // 'User-Agent': 'Custom-Agent', 
    'User-Agent': 'LT-Bypass-Agent'
  },
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore(pinia);
    const token = authStore.getToken; // <- esto debe coincidir con tu getter
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// instance.interceptors.request.use(
//   (config) => {
//     const token = store.getters['Auth_Login/getToken'];
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

export default instance;