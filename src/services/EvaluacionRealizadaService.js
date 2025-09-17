import { authRequest } from "./_authRequest";

export const registrarEvaluacionRealizada = async (evaluacionData) => {
    return await authRequest('post', '/evaluacion-realizada', evaluacionData);
};


export const getEvaluacionById = async (id) => {
    return await authRequest('get', `/evaluacion-realizada/${id}`);
};

export const getAllEvaluacionesRealizadasPorAlumno = async (id) => {
    return await authRequest('get', `/evaluacion-realizada/evaluaciones-realizadas-por-alumno/${id}`);
};

export const findAllAlumnosPorEvaluacion = async (id) => {
    return await authRequest('get', `/evaluacion-realizada/evaluaciones-realizadas/${id}`);
};

export const findEvaluacionesDeUnAlumno = async (idEvaluacion, idAlumno) => {
    return await authRequest('get', `/evaluacion-realizada/evaluaciones-alumno/${idEvaluacion}/${idAlumno}`);
};