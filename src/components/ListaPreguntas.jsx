import { useState, useEffect } from "react";
import { Pregunta } from "../components/Pregunta";
import {
  Stack, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { Lugar } from "../components/Lugar";
import { Observacion } from "../components/Observacion";
import { registrarEvaluacionRealizada } from "../services/EvaluacionRealizadaService";
import { useDocente } from "../context/DocenteContext";
import { useEvaluacion } from "../context/EvaluacionContext";
import { useNavigate } from "react-router-dom";

export function ListaPreguntas({ preguntas, disabled, alumno, lugar, modificacionPuntajeValue, observacionValue }) {
  const { docenteContext } = useDocente();
  const { evaluacionContext } = useEvaluacion();
  const [error, setError] = useState();
  const [observacion, setObservacion] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [lugarSeleccionado, setLugarSeleccionado] = useState("");
  const [modificacionPuntaje, setModificacionPuntaje] = useState();
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRespuestas(preguntas.map((pregunta) => pregunta.respuesta ?? null));
  }, [preguntas]);

  const [registrado, setRegistrado] = useState(disabled);

  const handleRespuestaChange = (index, nuevaRespuesta) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = nuevaRespuesta;
    setRespuestas(nuevasRespuestas);
  };

  const handleLugarChange = (lugarSeleccionado) => {
    if (!lugar) {
      setLugarSeleccionado(lugarSeleccionado);
    }
  };

  const handleObservacionChange = (nuevoTexto) => {
    if (!observacionValue) {
      setObservacion(nuevoTexto);
    }
  };

  const handlePuntajeChange = (nuevoPuntaje) => {
    if (!modificacionPuntajeValue) {
      setModificacionPuntaje(nuevoPuntaje);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const respuestasFormateadas = respuestas.map((respuesta) => ({ respuesta }));

  const docenteData = docenteContext;
  const evaluacionData = evaluacionContext;
  const evaluacionRealizadaData = {
    alumno: { id: alumno?.id || null },
    docente: { id: docenteData.id },
    evaluacion: { id: evaluacionData.id },
    observacion: String(observacion) || null,
    lugarPractica: String(lugarSeleccionado),
    modificacionPuntaje: Number(modificacionPuntaje) || null,
    preguntaRespondida: respuestasFormateadas,
  };

  const handleOnClick = async () => {
    setRegistrado(!registrado);

    try {
      console.log(observacion);
      console.log(modificacionPuntaje);
      console.log(evaluacionRealizadaData);
      await registrarEvaluacionRealizada(evaluacionRealizadaData);
    } catch (error) {
      console.log(error.response?.data?.message);
      const mensajeError =
        error.response?.data?.message || "Error al registrar una evaluación.";
      setError(mensajeError);
      console.log(error.response);
      console.log(error.response?.data);
      console.log(error.response?.data?.message);
    }
    navigate("/home");
  };

  return (
    <div>
      <Stack>
        {preguntas.map((pregunta, index) => (
          <div className="evitar-corte" key={index}>
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
          </div>
        ))}
        <Lugar
          disabled={registrado}
          selected={lugar ? lugar : lugarSeleccionado}
          onChange={handleLugarChange}
        />
        <Observacion
          disabled={registrado}
          onObservacionChange={handleObservacionChange}
          onPuntajeChange={handlePuntajeChange}
          modificacionPuntajeValue={modificacionPuntajeValue ? modificacionPuntajeValue : modificacionPuntaje}
          observacionValue={observacionValue ? observacionValue : observacion}
        />
        {!registrado ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="botonVerde"
              style={{ marginTop: "3rem" }}
              onClick={handleOpenDialog}
            >
              {" "}
              Registrar{" "}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </Stack>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{

          "& .MuiDialog-paper": { padding: "2rem" },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"¿Confirmar registro de evaluación?"}</DialogTitle>

        <DialogActions>
          <Button color="success" onClick={handleOnClick} autoFocus>
            Sí
          </Button>
          <Button color="error" onClick={handleCloseDialog}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
