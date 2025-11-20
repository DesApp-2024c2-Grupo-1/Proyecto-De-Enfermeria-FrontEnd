import { authRequest } from "./_authRequest";

export const getAllEvaluaciones = async () => {
    return await authRequest('get', '/evaluacion');
};

export const getEvaluacionById = async (id) => {
    return await authRequest('get', `/evaluacion/${id}`);
};

export const getAllVersionesDeUnModelo = async (id) => {
    return await authRequest('get', `/evaluacion/versiones/${id}`);
};

export const postEvaluacionYPreguntas = async (evaluacionYPreguntasData) => {
    return await authRequest('post', '/evaluacion', evaluacionYPreguntasData);
};

export const putEvaluacionYPreguntas = async (evaluacionYPreguntasData, id) => {
    return await authRequest('put', `/evaluacion/modificar-evaluacion/${id}`, evaluacionYPreguntasData);
};

export const deshabilitarEvaluacion = async (id) => {
    return await authRequest('put', `/evaluacion/${id}`);
};