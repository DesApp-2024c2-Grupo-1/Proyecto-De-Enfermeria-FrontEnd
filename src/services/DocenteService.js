import axios from "axios";

export const registrarDocente = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/docente', docenteData);
    return response.data;
  };

export const getDocenteByEmail = async (email) => {
  const response = await axios.get(`http://localhost:3000/alumno/dni/${email}`)
  return response.data
}