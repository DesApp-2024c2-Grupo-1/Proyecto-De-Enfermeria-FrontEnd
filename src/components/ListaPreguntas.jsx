import { useState } from 'react';
import { Pregunta } from "../components/Pregunta";

export function ListaPreguntas({ preguntas, disabled}) {
  
  const [respuestas, setRespuestas] = useState(
    preguntas.map((pregunta) => pregunta.respuesta || null)
  );

  const [registrado, setRegistrado] = useState(disabled);

  const handleRespuestaChange = (index, nuevaRespuesta) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = nuevaRespuesta;
    setRespuestas(nuevasRespuestas);
  };

  const handleOnClick = () => {
    setRegistrado(true);
  };

  return (
    <div>
    <div className="listaPreguntas">
      {preguntas.map((pregunta, index) => (
        <Pregunta
          key={index}
          pregunta={pregunta.pregunta}
          respuesta={respuestas[index]} 
          disabled={disabled || pregunta.respuesta !== undefined} 
          onChange={(nuevaRespuesta) => handleRespuestaChange(index, nuevaRespuesta)} 
        />
      ))}
    </div>
    <div>
      <button></button>
    </div>
    </div>
  );
}
