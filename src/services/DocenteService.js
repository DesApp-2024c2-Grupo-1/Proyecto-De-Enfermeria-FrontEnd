import axios from "axios";

export const registrarDocente = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/docente', docenteData);
    return response.data;
  };

export const getDocenteByEmail = async (email) => {
  const response = await axios.get(`http://localhost:3000/docente/email/${email}`)
  return response.data
}

export const getDocenteByDni = async (dni) => {
  const response = await axios.get(`http://localhost:3000/docente/dni/${dni}`)
  return response.data
}