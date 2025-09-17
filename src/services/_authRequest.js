// src/services/authRequest.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// ✅ Variable para almacenar el callback
let noAutorizado = null;

/**
 * Configurar callback para manejar error 401
 * @param {function} callback - Función que se ejecutará en error 401
 */
export const noAutorizadoCallback = (callback) => {
  noAutorizado = callback;
};

export const authRequest = async (method, url, data = null) => {
    try {
        const token = localStorage.getItem("token");
        
        if (!token) {
            throw new Error('No se encontró token de autenticación');
        }

        const config = {
            method: method.toLowerCase(),
            url: `${API_BASE_URL}${url}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        return response.data;
        
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("docente");
            
            if (noAutorizado) {
                noAutorizado();
            } else {
                console.warn('Callback de redirección no configurado');
            }
        }
        console.error('Error en authRequest:', error);
        throw error;
    }
};