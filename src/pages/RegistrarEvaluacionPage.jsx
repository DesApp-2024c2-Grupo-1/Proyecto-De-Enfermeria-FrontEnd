import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Evaluacion } from "../components/Evaluacion";
import { getEvaluacionById } from "../services/EvaluacionService";

export function RegistrarEvaluacionPage() {
  const [evaluacion, setEvaluacion] = useState(null);
  const { id } = useParams();

  console.log(Number(id))

  const fetchEvaluacion = async (idDeEvaluacion) => {
    const data = await getEvaluacionById(idDeEvaluacion);
    setEvaluacion(data)
  };
  useEffect(() => {
   fetchEvaluacion(id)
  }, [id]);

  const preguntas = evaluacion?.pregunta || []

  return (
    <>
    <Evaluacion preguntas={preguntas} /> 
    </>
  );
}
