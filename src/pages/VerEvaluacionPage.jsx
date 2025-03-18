import { useState, useEffect } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { useParams } from "react-router-dom";
import { getEvaluacionById } from "../services/EvaluacionRealizadaService";

/*const preguntas = [
  { pregunta: "Lorem ipsum dolor sit amet?", respuesta: true },
  { pregunta: "Consectetur adipiscing elit?", respuesta: false },
  { pregunta: "Sed do eiusmod tempor incididunt?", respuesta: false },
  { pregunta: "Ut labore et dolore magna aliqua?", respuesta: false },
  { pregunta: "Ut enim ad minim veniam?", respuesta: true },
  { pregunta: "Duis aute irure dolor in reprehenderit?", respuesta: false },
  {
    pregunta: "Excepteur sint occaecat cupidatat non proident?",
    respuesta: true,
  },
  {
    pregunta: "Sunt in culpa qui officia deserunt mollit anim id est laborum?",
    respuesta: false,
  },
];*/

export function VerEvaluacionPage() {
  const { id } = useParams();
  const [evaluacionRealizada, setEvaluacionRealizada] = useState({});
  const [preguntas, setPreguntas] = useState([]);

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    console.log(data);

    setEvaluacionRealizada(data);
    setPreguntas(data.preguntaRespondida);
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);
  

  return (
    <>
      <Evaluacion
        preguntas={preguntas}
        disabled={true}
        alumnoDisabled={true}
        alumnoPlaceholder={`${evaluacionRealizada.alumno?.nombre} ${evaluacionRealizada.alumno?.apellido}`}
      />
    </>
  );
}
