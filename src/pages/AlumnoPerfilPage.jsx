import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
//import Filtro from "../components/Filtro";
import Lista from "../components/Lista";
import { getAllEvaluacionesRealizadasPorAlumno } from "../services/EvaluacionRealizadaService";
import { Stack, Box } from "@mui/material";

export function AlumnoPerfilPage() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const keys = ["fecha", "nota"];
  const navigate = useNavigate();
  const location = useLocation();
  const alumnoNombre = location.state.alumnoNombre;
  const alumnoApellido = location.state.alumnoApellido;
  const { idAlumno } = useParams();

  const evaluacionesTitulos = Array.from(
    new Set(evaluaciones.map((evaluacion) => evaluacion.evaluacion.titulo))
  );

  const evaluacionesFiltradas = evaluacionesTitulos.map((titulo) => {
    return {
      titulo: titulo,
      instancias: evaluaciones.filter(
        (evaluacion) => evaluacion.evaluacion.titulo === titulo
      ),
    };
  });

  const fetchEvaluacionesPorAlumno = async (id) => {
    const data = await getAllEvaluacionesRealizadasPorAlumno(id);
    setEvaluaciones(data);
  };

  useEffect(() => {
    fetchEvaluacionesPorAlumno(idAlumno);
  }, [idAlumno]);

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <h1>
          {alumnoNombre} {alumnoApellido}
        </h1>

        <Box sx={{ width: "70%", display: "flex", flexDirection: "column" }}>
          {evaluacionesFiltradas.map((evaluacion, index) => (
            <Lista
              key={index}
              titulo={evaluacion.titulo}
              lista={evaluacion.instancias}
              keys={keys}
              /*!!!!!!!!!!!!!!! Cuando pasas un buttonOnClick es necesario que le pases el parametro en la funcion, sino no lo va a leer. Si pasas la funcion directo se pone ahi y sino en el handle !!!!!!!!!!!!!!!*/
              buttonOnClick={(id) => navigate(`/verEvaluacion/${id}`)}
              paramOnClick="id"
            />
          ))}
        </Box>
      </Stack>
    </>
  );
}
