import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para manejar errores
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error de respuesta:', error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('Error de red:', error.request);
        } else {
            // Algo sucedió en la configuración de la petición
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;