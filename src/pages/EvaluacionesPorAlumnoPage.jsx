import Busqueda from "../components/busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";

const datos = [
  { fecha: "12/10/24", porcentaje: "100%" },
  { fecha: "13/10/24" },
  { fecha: "14/10/24" },
  { fecha: "15/10/24"  },
  { fecha: "16/10/24" },
];

const estilos = {
  textoUno: { color: "blue", fontWeight: "bold" }, // Estilos para textoUno
  textoDos: { color: "green", fontStyle: "italic" }, // Estilos para textoDos
};

export function EvaluacionesPorAlumno() {
  const navigate = useNavigate();
  const keys = ["fecha", "porcentaje"];

  return (
    <>
      <div className="registroEvaluacionesContainer">
        <h1>Lavado de manos</h1>
        <div className="registroEvaluaciones">
          <Busqueda />
          <Lista
            lista={datos}
            keys={keys}
            estilos={estilos}
            buttonOnClick={() => navigate("/evaluacionesPorAlumno")}
          />
        </div>
      </div>
    </>
  );
}
