import { useState, useEffect } from "react";
import { Pregunta } from "../components/Pregunta";
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Lugar } from "../components/Lugar";
import { Observacion } from "../components/Observacion";
import { registrarEvaluacionRealizada } from "../services/EvaluacionRealizadaService";
import { useDocente } from "../context/DocenteContext";
import { useEvaluacion } from "../context/EvaluacionContext";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

export function ListaPreguntas({
  preguntas,
  disabled,
  alumno,
  lugar,
  modificacionPuntajeValue,
  observacionValue,
}) {
  const { docenteContext } = useDocente();
  const { evaluacionContext } = useEvaluacion();
  const [error, setError] = useState();
  const [observacion, setObservacion] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExito, setOpenDialogExito] = useState(false);
  const [openDialogIncompleto, setOpenDialogIncompleto] = useState(false);
  const [openDialogFaltaObservacion, setOpenDialogFaltaObservacion] =
    useState(false);
  const [lugarSeleccionado, setLugarSeleccionado] = useState("");
  const [modificacionPuntaje, setModificacionPuntaje] = useState();
  const [respuestas, setRespuestas] = useState([]);
  const [notaModificada, setnotaModificada] = useState(0);
  const [alerta, setAlerta] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const puntajeTotal = preguntas.reduce(
    (total, pregunta) => total + (pregunta.puntaje || 0),
    0
  );

  const puntajeObtenido = respuestas
    .map((resp, index) => {
      if (resp) {
        return preguntas[index].puntaje;
      } else return 0;
    })
    .reduce((total, puntaje) => total + puntaje, 0);

  const notaFinal = Math.max(
    0,
    Math.min(
      Math.round(
        ((puntajeObtenido + modificacionPuntaje) * 100) / puntajeTotal
      ),
      100
    )
  );

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
      setAlerta(true);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogIncompleto = () => {
    setOpenDialog(false);
    setOpenDialogIncompleto(false);
  };

  const handleCloseDialogFaltaObservacion = () => {
    setOpenDialog(false);
    setOpenDialogFaltaObservacion(false);
  };
  const respuestasFormateadas = respuestas.map((respuesta) => ({ respuesta }));

  const docenteData = docenteContext;
  const evaluacionData = evaluacionContext;
  const evaluacionRealizadaData = {
    alumno: { id: alumno?.id || null },
    docente: { id: docenteData.id },
    evaluacion: { id: evaluacionData.id },
    observacion: String(observacion) || null,
    lugarEvaluacion: Number(lugarSeleccionado),
    modificacionPuntaje: Number(modificacionPuntaje) || null,
    preguntaRespondida: respuestasFormateadas,
  };

  const handleOnClick = async () => {
    if (!registrado) {
      const alumnoInvalido = !alumno || !alumno.id;
      const respuestasIncompletas =
        respuestas.length !== preguntas.length ||
        respuestas.some((r) => r !== true && r !== false);
      const lugarNoSeleccionado = !lugar && lugarSeleccionado === "";

      const observacionTexto = observacionValue ?? observacion;
      const observacionRequerida =
        Number.isFinite(modificacionPuntaje) &&
        modificacionPuntaje !== 0 &&
        (!observacionTexto || observacionTexto.trim() === "");

      if (alumnoInvalido || respuestasIncompletas || lugarNoSeleccionado) {
        setOpenDialog(false);
        setOpenDialogIncompleto(true);
        return;
      }

      if (observacionRequerida) {
        setOpenDialog(false);
        setOpenDialogFaltaObservacion(true);
        return;
      }
    }

    setRegistrado(true);

    try {
      await registrarEvaluacionRealizada(evaluacionRealizadaData);
      setOpenDialog(false);
      setOpenDialogExito(true);
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al registrar una evaluación.";
      setError(mensajeError);
    }
  };

  const handleCrearOtro = () => {
    window.location.reload();
  };

  return (
    <div>
      <Stack>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <div className="no-break-inside">
              <Pregunta
                pregunta={pregunta.pregunta}
                puntaje={pregunta.puntaje}
                respuesta={respuestas[index]}
                disabled={registrado || pregunta.respuesta !== undefined}
                onChange={(nuevaRespuesta) =>
                  handleRespuestaChange(index, nuevaRespuesta)
                }
              />
            </div>
          </div>
        ))}
        <div className="no-break-inside">
          <Lugar
            disabled={registrado}
            selected={lugar ? lugar : lugarSeleccionado}
            onChange={handleLugarChange}
            movil={xs ? "true" : "false"}
          />
        </div>
        <div className="no-break-inside">
          <Observacion
            disabled={registrado}
            onObservacionChange={handleObservacionChange}
            onPuntajeChange={handlePuntajeChange}
            modificacionPuntajeValue={
              modificacionPuntajeValue
                ? modificacionPuntajeValue
                : modificacionPuntaje
            }
            observacionValue={observacionValue ? observacionValue : observacion}
            notaFinal={notaFinal}
            alerta={alerta}
          />
        </div>
        {!registrado ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="botonVerde"
              style={{ marginTop: "3rem" }}
              onClick={handleOpenDialog}
            >
              Registrar
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
          "& .MuiDialog-paper": { padding: "1.75rem", borderRadius: "20px" },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Confirmar registro de evaluación?"}
        </DialogTitle>

        <DialogActions>
          <Button color="success" onClick={handleOnClick} autoFocus>
            Sí
          </Button>
          <Button color="error" onClick={handleCloseDialog}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogIncompleto}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            padding: "1.75rem",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <dotlottie-wc
            src="https://lottie.host/3ad3e392-c8df-41de-b9c8-004062231a1a/CK0tyZju6R.lottie"
            autoplay
          ></dotlottie-wc>
        </DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center" }}>
            La evaluación no está completa. Por favor, especifica el <b>DNI</b>,
            marca todas las <b>preguntas</b> y el <b>lugar</b> para continuar.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#1A3D2D" }}
            onClick={handleCloseDialogIncompleto}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogFaltaObservacion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            padding: "1.75rem",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <dotlottie-wc
            src="https://lottie.host/3ad3e392-c8df-41de-b9c8-004062231a1a/CK0tyZju6R.lottie"
            autoplay
          ></dotlottie-wc>
        </DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center" }}>
            Cuando se modifica el puntaje, es necesario agregar una{" "}
            <b>observación</b>. Por favor, completa el campo de observación.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#1A3D2D" }}
            onClick={handleCloseDialogFaltaObservacion}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogExito}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": { padding: "1.75rem", borderRadius: "20px" },
        }}
      >
        <DialogTitle
          id="alert-dialog-exito"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <dotlottie-wc
            src="https://lottie.host/182b34ff-8146-4be2-9cc9-e1ea97d6a04d/u56gM45ANy.lottie"
            style={{ width: "300px", height: "300px", margin: "-50px" }}
            autoplay
          ></dotlottie-wc>
        </DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center" }}>
            La evaluación fue registrada correctamente.
          </p>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={() => navigate("/home")}>
            Ir al inicio
          </Button>
          <Button color="success" onClick={handleCrearOtro} autoFocus>
            Evaluar nuevamente
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
