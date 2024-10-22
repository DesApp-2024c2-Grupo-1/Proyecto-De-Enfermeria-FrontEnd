import Busqueda from "../components/busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";

const examenes = [
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

export function AlumnoPerfilPage() {
  const keys = ["fecha", "porcentaje"];
  const navigate = useNavigate();

  return (
    <>
      <h1>Maria Gonzalez</h1>
      <div style={{ margin: 120 }}>
        {examenes.map((examen, index) => (
          <Lista
            key={index}
            titulo={examen.titulo}
            lista={examen.instancias}
            keys={keys}
            buttonOnClick={() => navigate("/verEvaluacion")}
          />
        ))}
      </div>
    </>
  );
}
