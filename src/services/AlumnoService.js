import axios from "axios";

export const registrarAlumno = async (alumnoData) => {
    const response = await axios.post('http://localhost:3000/alumno', alumnoData);
    return response.data;
};

export const getAllAlumnos = async () => {
    const response = await axios.get('http://localhost:3000/alumno');
    return response.data;
};
