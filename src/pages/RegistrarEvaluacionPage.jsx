import { useEffect, useState } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { getEvaluacionById } from "../services/EvaluacionService";

export function RegistrarEvaluacionPage() {
  const [evaluacion, setEvaluacion] = useState(null);
  const fetchEvaluacion = async () => {
  const data = await getEvaluacionById(1);
    setEvaluacion(data)
  };
  useEffect(() => {
   fetchEvaluacion()
  }, []);

  const preguntas = evaluacion?.pregunta || []

  return (
    <>
    <Evaluacion preguntas={preguntas} /> 
    </>
  );
}
