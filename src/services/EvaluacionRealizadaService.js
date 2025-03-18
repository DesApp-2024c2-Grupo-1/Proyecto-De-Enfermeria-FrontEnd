import axios from "axios";

export const registrarEvaluacionRealizada = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/evaluacion-realizada', docenteData);
    return response.data;
  };

  export const getAllEvaluacionesRegistradas = async () => {
    const response = await axios.get('http://localhost:3000/evaluacion-realizada');
    return response.data;
  };

  export const getAllEvaluacionesRegistradasPorTitulo = async (titulo) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/${titulo}`);
    return response.data;
  };

  export const findAllAlumnosPorEvaluacion = async (id) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/evaluaciones-realizadas/${id}`);
    return response.data;
  };

  export const findEvaluacionesDeUnAlumno = async (idEvaluacion, idAlumno) => {
    const response = await axios.get(`http://localhost:3000/evaluacion-realizada/evaluaciones-alumno/${idEvaluacion}/${idAlumno}`);
    return response.data;
  };