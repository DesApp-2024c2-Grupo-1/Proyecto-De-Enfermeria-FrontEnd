import Busqueda from "../components/Busqueda";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import IrArribaBoton from "../components/irArribaBoton";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { findEvaluacionesDeUnAlumno } from "../services/EvaluacionRealizadaService";

export function EvaluacionesPorAlumno() {
  const navigate = useNavigate();
  const keys = ["fecha", "nota"];
  const [evaluaciones, setEvaluaciones] = useState([]);
  const { idAlumno } = useParams();
  const location = useLocation();

  const evaluacionTitulo = location.state
    ? location.state.evaluacionTitulo
    : "Título no disponible";

  const evaluacionId = location.state
    ? location.state.evaluacionId
    : "Id no disponible";

  const alumnoNombre = location.state
    ? location.state.alumnoNombre
    : "Nombre no disponible";

  const alumnoApellido = location.state
    ? location.state.alumnoApellido
    : "Apellido no disponible";

  const fetchEvaluacionesPorAlumno = async (evaluacionId, idAlumno) => {
    const data = await findEvaluacionesDeUnAlumno(evaluacionId, idAlumno);
    setEvaluaciones(data);
  };

  useEffect(() => {
    fetchEvaluacionesPorAlumno(evaluacionId, idAlumno);
  }, [evaluacionId, idAlumno]);

  return (
    <>
      <IrArribaBoton />
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacionTitulo}</h1>
        <Stack sx={{ width: "60%" }}>
          <Stack
            direction={"row"}
            display={{ alignItems: "center" }}
            spacing={2}
          >
            <h2>
              {alumnoNombre} {alumnoApellido}
            </h2>
            <Busqueda />
          </Stack>

          <Lista
            lista={evaluaciones}
            keys={keys}
            buttonOnClick={(evaluacionId) =>
              navigate(`/verEvaluacion/${evaluacionId}`)
            }
            paramOnClick={"id"}
          />
        </Stack>
      </Stack>
    </>
  );
}
