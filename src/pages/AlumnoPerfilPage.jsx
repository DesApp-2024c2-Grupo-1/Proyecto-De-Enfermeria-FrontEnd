import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Filtro from "../components/Filtro";
import Lista from "../components/Lista";
import { getAlumnoByDni } from "../services/alumnoService";

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
  const [alumno, setAlumno] = useState(null);
  const keys = ["fecha", "porcentaje"];
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchAlumnoByDni = async (id) => {
    const data = await getAlumnoByDni(id);
    setAlumno(data);
  };

 
  useEffect(() => {
    fetchAlumnoByDni(id);
  }, [id]);

  return (
    <>
      
      <h1>{alumno ? alumno.nombre : "Cargando..."}</h1>

      <div style={{ margin: "10px 120px" }}>
        <Filtro />
        <div>
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
      </div>
    </>
  );
}
