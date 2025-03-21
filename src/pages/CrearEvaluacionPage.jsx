import { useState } from "react";
import {
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { postEvaluacionYPreguntas } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { createTheme } from "@mui/material/styles";
import { AiFillPlusCircle } from "react-icons/ai";

export function CrearEvaluacionPage() {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [puntaje, setNuevoPuntaje] = useState("");
  const [errorCriterio, setErrorCriterio] = useState("");
  const [errorPuntaje, setErrorPuntaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const navigate = useNavigate();
  const { docenteContext } = useDocente();
  const [error, setError] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const evaluacionData = { titulo, docente: docenteContext.id, preguntas };

  const agregarCriterio = () => {
    if (!nuevoCriterio.trim()) {
      setErrorCriterio("La pregunta no puede estar vacía.");
      return;
    } else if (nuevoCriterio.length < 5) {
      setErrorCriterio("La pregunta debe tener al menos 5 caracteres.");
      return;
    } else if (nuevoCriterio.length > 100) {
      setErrorCriterio("La pregunta no puede tener más de 100 caracteres.");
      return;
    } else {
      setErrorCriterio("");
    }

    if (!puntaje.trim()) {
      setErrorPuntaje("El puntaje no puede estar vacío.");
      return;
    } else if (isNaN(puntaje) || Number(puntaje) <= 0) {
      setErrorPuntaje("El puntaje debe ser un número mayor a 0.");
      return;
    } else {
      setErrorPuntaje("");
    }

    const existePregunta = preguntas.some(
      (criterio) =>
        criterio.pregunta.trim().toLowerCase() ===
        nuevoCriterio.trim().toLowerCase()
    );
    if (existePregunta) {
      setErrorCriterio("La pregunta ya está en la lista.");
      return;
    }

    setPreguntas([
      ...preguntas,
      { pregunta: nuevoCriterio.trim(), puntaje: Number(puntaje) },
    ]);
    setNuevoCriterio("");
    setNuevoPuntaje("");
  };
  const eliminarCriterio = (indice) => {
    setPreguntas(preguntas.filter((_, i) => i !== indice));
  };

  const manejarEnvio = async () => {
    try {
      await postEvaluacionYPreguntas(evaluacionData);
      navigate("/crearEvaluacionExito");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al registrar la evaluación.";
      setError(mensajeError);
      setOpenSnackbar(true);
      /*let mensajes;
      if (Array.isArray(data)) {
        mensajes = data;
      } else if (typeof data === "object" && data !== null) {
        mensajes = Object.values(data).flat();
      } else {
        mensajes = [data || "Ocurrió un error inesperado"];
      }

      alert(mensajes.join("\n"));*/
    }
  };

  return (
    <Box>
      <h2 style={{ textAlign: "center", marginTop: "7vh" }}>
        Crear Evaluación
      </h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 3,
            borderRadius: 7,
            backgroundColor: "#DDF0E7",
          }}
        >
          <Input
            placeholder="Título de evaluación"
            texto="titulo"
            width="100%"
            helperText=""
            helperTextColor="gray"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
          />

          <p style={{ marginBottom: 1, fontSize: "17px", fontWeight: "bold" }}>
            Criterio de Evaluación
          </p>
          <List sx={{ marginBottom: 3 }}>
            {preguntas.map((criterio, indice) => (
              <ListItem
                key={indice}
                secondaryAction={
                  <button
                    onClick={() => eliminarCriterio(indice)}
                    className="botonClaro"
                  >
                    Borrar
                  </button>
                }
              >
                <ListItemText
                  primary={criterio.pregunta}
                  secondary={`Puntaje: ${criterio.puntaje}`}
                />
              </ListItem>
            ))}
          </List>
          {xs ? <Stack
            direction=  "column"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Input
              placeholder="Nueva pregunta"
              texto="nuevaPregunta"
              width="100%"
              helperText={errorCriterio || " "}
              helperTextColor="red"
              value={nuevoCriterio}
              onChange={(e) => setNuevoCriterio(e.target.value)}
            />
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Input
              width="200px"
              placeholder="Puntaje"
              texto="puntaje"
              helperText={errorPuntaje || " "}
              helperTextColor="red"
              helperTextWidth="200px"
              value={puntaje}
              onChange={(e) => setNuevoPuntaje(e.target.value)}
            />
            <Box sx={{ alignSelf: "flex-center" }}>
              <button
                onClick={agregarCriterio}
                className="botonClaro"
                style={{ marginTop: "28px", width:"100%" }}
              >
                Añadir
              </button>
            </Box>
            </Stack>
          </Stack> : <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Input
              placeholder="Nueva pregunta"
              texto="nuevaPregunta"
              helperText={errorCriterio || " "}
              helperTextColor="red"
              value={nuevoCriterio}
              onChange={(e) => setNuevoCriterio(e.target.value)}
            />
            <Input
              width="200px"
              placeholder="Puntaje"
              texto="puntaje"
              helperText={errorPuntaje || " "}
              helperTextColor="red"
              helperTextWidth="200px"
              value={puntaje}
              onChange={(e) => setNuevoPuntaje(e.target.value)}
            />
            <Box sx={{ alignSelf: "flex-start" }}>
              <button
                onClick={agregarCriterio}
                className="botonClaro"
                style={{ marginTop: "28px" }}
              >
                Añadir
              </button>
            </Box>
          </Box>}
        </Paper>
        <button
          onClick={manejarEnvio}
          className="botonClaro"
          style={{ marginTop: "20px" }}
        >
          Guardar
        </button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          backgroundColor: "red",
        }}
      >
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          sx={{
            width: "100%",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{ width: "50%" }}
          >
            <ul>
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
