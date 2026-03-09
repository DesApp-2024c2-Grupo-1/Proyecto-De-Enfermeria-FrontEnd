import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Evaluacion } from "../components/Evaluacion";
import { getEvaluacionById } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";

export function RegistrarEvaluacionPage() {
  const [evaluacion, setEvaluacion] = useState(null);
  const { id } = useParams();
  const { docenteContext } = useDocente();


  const fetchEvaluacion = async (idDeEvaluacion) => {
    const data = await getEvaluacionById(idDeEvaluacion);
    setEvaluacion(data);
    console.log(data);
  };
  useEffect(() => {
    fetchEvaluacion(id);
  }, [id]);

  const preguntas = evaluacion?.preguntas || [];

  return (
    <>
      <Evaluacion preguntas={preguntas} docenteApellido={docenteContext.apellido} docenteNombre={docenteContext.nombre}/>
    </>
  );
}
