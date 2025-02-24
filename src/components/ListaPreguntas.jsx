import { useState } from "react";
import { Pregunta } from "../components/Pregunta";
import { Stack } from "@mui/material";
import { Lugar } from "../components/Lugar";
import { Observacion } from "../components/Observacion";
import { registrarEvaluacionRealizada } from "../services/EvaluacionRealizadaService";

export function ListaPreguntas({ preguntas, disabled }) {
  const { docenteContext } = useDocente();
  const [respuestas, setRespuestas] = useState(
    preguntas.map((pregunta) => pregunta.respuesta ?? null)
  );

  const [registrado, setRegistrado] = useState(disabled);

  const docenteData = docenteContext;
  const evaluacionRealizadaData = {
    alumno: alumno.id,
    docente: docenteData.id,
    evaluacion: evaluacion.id,
    respuestas,
    fecha: new Date(),
  };

  const handleRespuestaChange = (index, nuevaRespuesta) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = nuevaRespuesta;
    setRespuestas(nuevasRespuestas);
  };

  const handleOnClick = async () => {
    setRegistrado(!registrado);
    console.log(respuestas);
    try {
      await registrarEvaluacionRealizada(evaluacionRealizadaData);
      console.log("Registro exitoso");
    } catch (error) {
      console.log(error.response?.data?.message);
      const mensajeError =
        error.response?.data?.message || "Error al registrar uan evaluacion";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
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
