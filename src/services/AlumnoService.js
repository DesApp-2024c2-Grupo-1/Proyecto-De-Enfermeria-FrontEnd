import axios from "axios";
import { authRequest } from "./_authRequest";

export const registrarAlumno = async (alumnoData) => {
    const response = await axios.post('http://localhost:3000/alumno', alumnoData);
    return response.data;
};

export const getAllAlumnos = async () => {
    return await authRequest('get', '/alumno');
};

export const getAlumnoById = async (id) => {
    return await authRequest('get', `/alumno/${id}`);
};