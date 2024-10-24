import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";

const datos = [
  { fecha: "12/10/24", porcentaje: "50%" },
  { fecha: "13/10/24", porcentaje: "80%" },
  { fecha: "14/10/24", porcentaje: "70%" },
  { fecha: "15/10/24", porcentaje: "95%"  },
  { fecha: "16/10/24", porcentaje: "100%" },
];


export function EvaluacionesPorAlumno() {
  const navigate = useNavigate();
  const keys = ["fecha", "porcentaje"];

  return (
    <>
      <div className="registroEvaluacionesContainer">
        <h1>Lavado de manos</h1>
        <div className="registroEvaluaciones">
          <div className="evaluacionesPorAlumnoNombre">
            <h2>Maria Gonzalez</h2>
            <Busqueda />
          </div>
          <Lista
            lista={datos}
            keys={keys}
            buttonOnClick={() => navigate("/verEvaluacion")}
          />
        </div>
      </div>
    </>
  );
}
