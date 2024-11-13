
import { Evaluacion } from "../components/Evaluacion";


const preguntas = [
  { pregunta: "Lorem ipsum dolor sit amet?" },
  { pregunta: "Consectetur adipiscing elit?" },
  { pregunta: "Sed do eiusmod tempor incididunt?" },
  { pregunta: "Ut labore et dolore magna aliqua?" },
  { pregunta: "Ut enim ad minim veniam?" },
  { pregunta: "Duis aute irure dolor in reprehenderit?" },
  {pregunta: "Sint occaecat cupidatat non proident?"},
  {
    pregunta: "Sunt in culpa qui officia deserunt mollit anim id est laborum?",
  },
];

export function RegistrarEvaluacionPage() {

  return (
    <>
    <Evaluacion preguntas={preguntas} />
    </>
  );
}
