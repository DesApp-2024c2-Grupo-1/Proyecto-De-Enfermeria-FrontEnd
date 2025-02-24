import axios from "axios";

export const registrarEvaluacionRealizada = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/evaluacion-realizada', docenteData);
    return response.data;
  };