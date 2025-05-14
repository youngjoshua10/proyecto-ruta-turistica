import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { pinia } from '@/main';
// import { createPinia } from 'pinia';
// const pinia = createPinia();
// import store from '@/store/store';

const instance = axios.create({
  baseURL: 'https://eea9-2800-bf0-826a-1201-1e1b-d47d-48b5-bef8.ngrok-free.app/api/',
  // baseURL: 'http://192.168.100.48:81/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
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