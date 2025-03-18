import axios from "axios";

export const registrarAlumno = async (alumnoData) => {
    const response = await axios.post('http://localhost:3000/alumno', alumnoData);
    return response.data;
};

export const getAllAlumnos = async () => {
    const response = await axios.get('http://localhost:3000/alumno');
    return response.data;
};

export const getAlumnoByDni = async (dni) => {
    const response = await axios.get(`http://localhost:3000/alumno/dni/${dni}`);
    return response.data;
};

export const getAlumnoById = async (id) => {
    const response = await axios.get(`http://localhost:3000/alumno/${id}`);
    return response.data;
};