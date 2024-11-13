import { Evaluacion } from "../components/Evaluacion";

const preguntas = [
  { pregunta: "Lorem ipsum dolor sit amet?", respuesta: true },
  { pregunta: "Consectetur adipiscing elit?", respuesta: false },
  { pregunta: "Sed do eiusmod tempor incididunt?", respuesta: true },
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
];

export function VerEvaluacionPage() {
  return (
    <>
      <Evaluacion preguntas={preguntas} disabled={true}  alumnoDisabled={true} alumnoPlaceholder="Maria Gonzalez" />
    </>
  );
}
