import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
//import Filtro from "../components/Filtro";
import Lista from "../components/Lista";
import { getAllEvaluacionesRealizadasPorAlumno } from "../services/EvaluacionRealizadaService";
import { Stack, Box } from "@mui/material";

/*const examenes = [
  {
    titulo: "Lavado de manos",
    instancias: [
      { fecha: "12/10/24", porcentaje: "50%" },
      { fecha: "13/10/24", porcentaje: "80%" },
      { fecha: "11/10/24", porcentaje: "95%" },
    ],
  },
  {
    titulo: "Tomar la presión",
    instancias: [
      { fecha: "14/10/24", porcentaje: "70%" },
      { fecha: "15/10/24", porcentaje: "95%" },
    ],
  },
  {
    titulo: "Primeros auxilios",
    instancias: [{ fecha: "16/10/24", porcentaje: "100%" }],
  },
]; 
*/

export function AlumnoPerfilPage() {
  const [alumno, setAlumno] = useState(null);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const keys = ["fecha", "porcentaje"];
  const navigate = useNavigate();
  const location = useLocation();
  const alumnoNombre = location.state.alumnoNombre;
  const alumnoApellido = location.state.alumnoApellido;
  const { id } = useParams();

 

  /*evaluaciones.map((evaluacion) => {
    if (!evaluacionesTitulos.includes(evaluacion.evaluacion.titulo)) {
      evaluacionesTitulos.push(evaluacion.evaluacion.titulo);
    }
  });*/

  const evaluacionesFiltradas = [
    { titulo: "" },
    { instancias: [{ fecha: "", porcentaje: "" }] },
  ];
 
  const evaluacionesTitulos = Array.from(new Set(evaluaciones.map((evaluacion) => evaluacion.evaluacion.titulo)));

  evaluaciones.forEach((evaluacion, index) => {
    if(!evaluacionesTitulos.includes(evaluacion.evaluacion.titulo)){
      evaluacionesFiltradas.push({titulo:evaluacion.evaluacion.titulo, instancias: {...index}});
    }
  });


  console.log(evaluacionesTitulos);
  console.log(evaluacionesFiltradas);

  /* 
  const { id } = useParams();

  const fetchAlumnoById = async (id) => {
    const data = await getAlumnoById(id);
    setAlumno(data);
  };

  useEffect(() => {
    fetchAlumnoById(id);
  }, [id]);
*/

  const fetchEvaluacionesPorAlumno = async (id) => {
    const data = await getAllEvaluacionesRealizadasPorAlumno(id);
    console.log(data);
    setEvaluaciones(data);
  };

  useEffect(() => {
    fetchEvaluacionesPorAlumno(id);
  }, [id]);

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
              lista={[]}
              keys={keys}
              buttonOnClick={() => navigate("/verEvaluacion")}
            />
          ))}
        </Box>
      </Stack>
    </>
  );
}
