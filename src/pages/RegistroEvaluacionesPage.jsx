import Busqueda from "../components/Busqueda";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";
import { getEvaluacionById } from "../services/EvaluacionService";
import { findAllAlumnosPorEvaluacion } from "../services/EvaluacionRealizadaService";

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
 
  const [alumnos, setAlumnos] = useState([]);
  const location = useLocation();
  const evaluacionTitulo = location.state
    ? location.state.evaluacionTitulo
    : "Título no disponible";

  const keys = ["nombre", "apellido", "dni"];
  const { id } = useParams();

  const listaFiltrada =
    searchTerm.length >= 7
      ? alumnos.filter((alumno) => String(alumno.dni).includes(searchTerm))
      : alumnos;

  const fetchAlumnosPorId = async (id) => {
    const data = await findAllAlumnosPorEvaluacion(id);
    setAlumnos(data);
  };

  useEffect(() => {
    fetchAlumnosPorId(id);
  }, [id]);

  const handleNavigate = (alumnoId) => {
    const alumno = listaFiltrada.find((alumno) => alumno.alumnoId === alumnoId);
    navigate(`/evaluacionesPorAlumno/${alumnoId}`, {
      state: { evaluacionTitulo: evaluacionTitulo, alumnoNombre: alumno.nombre, alumnoApellido: alumno.apellido },
    });
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacionTitulo}</h1>
        <Stack sx={{ width: "70%" }}>
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={handleNavigate}
            paramOnClick={"alumnoId"}
          />
        </Stack>
      </Stack>
    </>
  );
}
