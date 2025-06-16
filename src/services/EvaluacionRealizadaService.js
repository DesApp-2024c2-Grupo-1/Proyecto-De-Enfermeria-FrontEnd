import axios from "axios";

export const registrarEvaluacionRealizada = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/evaluacion-realizada', docenteData);
    return response.data;
  };
  export const getEvaluacionById = async (id) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/${id}`);
    return response.data;
  };

  export const getAllEvaluacionesRealizadasPorAlumno = async (id) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/evaluaciones-realizadas-por-alumno/${id}`);
    return response.data;
  } /* Trae todas las evaluaciones realizadas por un alumno, independientmente del modelo de evaluación*/

  export const findAllAlumnosPorEvaluacion = async (id) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/evaluaciones-realizadas/${id}`);
    return response.data;
  };

  export const findEvaluacionesDeUnAlumno = async (idEvaluacion, idAlumno) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/evaluaciones-alumno/${idEvaluacion}/${idAlumno}`);
    return response.data;
  };