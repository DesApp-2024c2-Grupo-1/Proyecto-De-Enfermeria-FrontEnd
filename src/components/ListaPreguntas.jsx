import { Pregunta } from "../components/Pregunta";

export function ListaPreguntas({ preguntas, disabled }) {
  return (
    <div>
      {preguntas.map((pregunta, index) => (
        <Pregunta
          key={index}
          pregunta={pregunta.pregunta}
          respuesta={pregunta.respuesta}
          disabled={disabled}
        />
      ))}
    </div>
    
  );
}
