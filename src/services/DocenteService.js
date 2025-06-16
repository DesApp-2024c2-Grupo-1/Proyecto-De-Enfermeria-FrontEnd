import axios from "axios";

export const registrarDocente = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/docente', docenteData);
    return response.data;
  };

export const loginDocente = async (dni, password) => {
  const response = await axios.post(`http://localhost:3000/docente/login`, {
    dni,
    password,
  });
  return response.data;
}

export const modificarDocente = async (id, docenteData) => {
  const response = await axios.put(`http://localhost:3000/docente/${id}`, docenteData);
  return response.data
}