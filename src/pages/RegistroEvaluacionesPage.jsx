import Busqueda from "../components/Busqueda";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";
import { getEvaluacionById } from "../services/EvaluacionService";
import { findAllAlumnosPorEvaluacion } from "../services/EvaluacionRealizadaService";

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [evaluacion, setEvaluacion] = useState();
  const [alumnos, setAlumnos] = useState([]);

  const keys = ["nombre", "apellido", "dni"];
  const { id } = useParams();

  const listaFiltrada =
    searchTerm.length >= 7
      ? alumnos.filter((alumno) => String(alumno.dni).includes(searchTerm))
      : alumnos;

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacion(data);
  };

  const fetchAlumnosPorId = async (id) => {
    const data = await findAllAlumnosPorEvaluacion(id);
    setAlumnos(data);
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);

  useEffect(() => {
    fetchAlumnosPorId(id);
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
