import { useState } from "react";
import { Pregunta } from "../components/Pregunta";
import { Stack } from "@mui/material";
import { Lugar } from "../components/Lugar";
import { Observacion } from "../components/Observacion";

export function ListaPreguntas({ preguntas, disabled }) {

  const [respuestas, setRespuestas] = useState(
    preguntas.map((pregunta) => pregunta.respuesta ?? null)
  );

  const [registrado, setRegistrado] = useState(disabled);

  const handleRespuestaChange = (index, nuevaRespuesta) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = nuevaRespuesta;
    setRespuestas(nuevasRespuestas);
  };

  const handleOnClick = () => {
    setRegistrado(!registrado);
    console.log(respuestas);
  };

  return (
    <div>
      <Stack>
        {preguntas.map((pregunta, index) => (
          <Pregunta
            key={index}
            pregunta={pregunta.pregunta}
            puntaje={pregunta.puntaje}
            respuesta={respuestas[index]}
            disabled={registrado || pregunta.respuesta !== undefined}
            onChange={(nuevaRespuesta) =>
              handleRespuestaChange(index, nuevaRespuesta)
            }
          />
        ))}
        <Lugar disabled={registrado} />
        <Observacion disabled={registrado} />
        {!registrado ? (
          <div>
            <button
              className="botonVerde flex-center"
              style={{ marginTop: "3rem" }}
              onClick={handleOnClick}
            >
              {" "}
              Registrar{" "}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </Stack>
    </div>
  );
}
