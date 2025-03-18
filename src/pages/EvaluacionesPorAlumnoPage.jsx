import Busqueda from "../components/Busqueda";
import { useNavigate, useLocation } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";
import { useEffect } from "react";
import { getEvaluacionById } from "../services/EvaluacionService";

export function EvaluacionesPorAlumno() {
  const navigate = useNavigate();
  const keys = ["fecha", "porcentaje"];
  const location = useLocation();
  const evaluacionTitulo = location.state
    ? location.state.evaluacionTitulo
    : "Título no disponible";
  const alumnoNombre = location.state
    ? location.state.alumnoNombre
    : "Nombre no disponible";
  const alumnoApellido = location.state
    ? location.state.alumnoApellido
    : "Apellido no disponible";

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacion(data);
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacionTitulo}</h1>
        <Stack sx={{ width: "80%" }}>
          <Stack
            direction={"row"}
            display={{ alignItems: "center" }}
            spacing={2}
          >
            <h2>
              {" "}
              {alumnoNombre} {alumnoApellido}
            </h2>
            <Busqueda />
          </Stack>

          <Lista
            lista={datos}
            keys={keys}
            buttonOnClick={() => navigate("/verEvaluacion")}
          />
        </Stack>
      </Stack>
    </>
  );
}
