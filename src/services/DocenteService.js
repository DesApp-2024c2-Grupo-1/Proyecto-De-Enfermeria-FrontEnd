import axios from "axios";

export const registrarDocente = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/docente', docenteData);
    return response.data;
  };