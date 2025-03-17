import Busqueda from "../components/Busqueda";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";
import { getEvaluacionById } from "../services/EvaluacionService";

const datos = [
  { nombre: "Maria Gonzalez", documento: "12345369" },
  { nombre: "Juan Perez", documento: "98765432" },
  { nombre: "Ana López", documento: "23456789" },
  { nombre: "Luis Rodríguez", documento: "34567890" },
  { nombre: "Sofia Torres", documento: "45678901" },
];

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [evaluacion, setEvaluacion] = useState();

  const keys = ["nombre", "documento"];
  const { id } = useParams();

  const listaFiltrada =
    searchTerm.length >= 7
      ? datos.filter((dato) => String(dato.documento).includes(searchTerm))
      : datos;

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacion(data);
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);

  const handleNavigate = (id) => {
    navigate(`/registroEvaluacion/${id}`);
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacion ? `${evaluacion.titulo}` : "Cargando..."}</h1>
        <Stack sx={{ width: "70%" }}>
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={handleNavigate}
            paramOnClick={"id"}
          />
        </Stack>
      </Stack>
    </>
  );
}
