import axios from "axios";
import { authRequest } from "./_authRequest";

export const registrarDocente = async (docenteData) => {
    const response = await axios.post('http://localhost:3000/docente', docenteData);
    return response.data;
  };

export const loginDocente = async (dni, password) => {
  const response = await axios.post(`http://localhost:3000/docente/login`, {
    dni,
    password,
  });

  const { access_token, docente } = response.data;

  localStorage.setItem("token", access_token)
  localStorage.setItem("docente", JSON.stringify(docente));

  return docente;
}

export const modificarDocente = async (id, docenteData) => {
    return await authRequest('put', `/docente/${id}`, docenteData);
}