import axios from "axios";

export const getAllEvaluaciones = async () => {
    const response = await axios.get('http://localhost:3000/evaluacion');
    return response.data;
};

export const getEvaluacionById = async (id) => {
    const response = await axios.get(`http://localhost:3000/evaluacion/${id}`);
    return response.data;
};

export const postEvaluacionYPreguntas = async (evaluacionYPreguntasData) => {
    const response = await axios.post(`http://localhost:3000/evaluacion`, evaluacionYPreguntasData);
    return response.data;
};