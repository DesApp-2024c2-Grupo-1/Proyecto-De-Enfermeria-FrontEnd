import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Alert,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  putEvaluacionYPreguntas,
  getEvaluacionById,
} from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { createTheme } from "@mui/material/styles";
import { useParams } from "react-router";

export function EditarEvaluacionPage() {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaAEditar, setPreguntaAEditar] = useState("");
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [puntaje, setNuevoPuntaje] = useState("");
  const [errorCriterio, setErrorCriterio] = useState("");
  const [errorPuntaje, setErrorPuntaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const navigate = useNavigate();
  const { docenteContext } = useDocente();
  const [error, setError] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();

  const evaluacionData = { docente: docenteContext.id, preguntas };

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

  const manejarEdicion = async () => {
    if (preguntas.length === 0) {
      setError(["Debes agregar al menos 1 pregunta"]);
      setOpenSnackbar(true);
      return;
    }
    try {
      await putEvaluacionYPreguntas(evaluacionData, id);
      navigate("/home");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al modificar la evaluación.";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  const handleEditarPregunta = (indice) => {
    setOpenDialog(true);
    setPreguntaAEditar(preguntas[indice]);
  };

  const handleGuardarPregunta = () => {
    console.log(preguntaAEditar);
    preguntaAEditar.pregunta = document.getElementById(
      "outlined-multiline-static"
    ).value;
    preguntaAEditar.puntaje = document.getElementById(
      "outlined-multiline-static-puntaje"
    ).value;
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchEvaluacion = async () => {
      try {
        const evaluacion = await getEvaluacionById(id);
        setTitulo(evaluacion.titulo);
        setPreguntas(evaluacion.preguntas);
      } catch (error) {
        console.error("Error fetching evaluacion:", error);
      }
    };
    fetchEvaluacion();
  }, []);

  return (
    <Box>
      <h2 style={{ textAlign: "center", marginTop: "7vh" }}>
        Editar Evaluación
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
            maxWidth: 800,
            padding: 3,
            borderRadius: 7,
            backgroundColor: xs ? "white" : "#DDF0E7",
          }}
        >
          <Input
            texto="titulo"
            width="100%"
            helperText=""
            helperTextColor="gray"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
            disabled={true}
          />

          <p style={{ marginBottom: 1, fontSize: "17px", fontWeight: "bold" }}>
            Criterio de Evaluación
          </p>
          <List sx={{ marginBottom: 3 }}>
            {preguntas.map((criterio, indice) => (
              <ListItem
                key={indice}
                secondaryAction={
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleEditarPregunta(indice)}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => eliminarCriterio(indice)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </Stack>
                }
              >
                <ListItemText
                  primary={criterio.pregunta}
                  secondary={`Puntaje: ${criterio.puntaje}`}
                  sx={{
                    maxWidth: {
                      xs: "300px",
                      sm: "400px",
                      md: "500px",
                      lg: "600px",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          {xs ? (
            /* VERSIÓN MÓVIL */
            <Stack
              direction="column"
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
                    style={{ marginTop: "28px", width: "100%" }}
                  >
                    Añadir
                  </button>
                </Box>
              </Stack>
            </Stack>
          ) : (
            /* VERSIÓN DESKTOP */
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Stack direction="row" width="100%" spacing={2}>
                <Input
                  sx={{ width: { xs: "10px", sm: "400px", md: "500px" } }}
                  placeholder="Nueva pregunta"
                  texto="nuevaPregunta"
                  helperText={errorCriterio || " "}
                  helperTextColor="red"
                  value={nuevoCriterio}
                  onChange={(e) => setNuevoCriterio(e.target.value)}
                />
                <Input
                  width="120px"
                  placeholder="Puntaje"
                  texto="puntaje"
                  helperText={errorPuntaje || " "}
                  helperTextColor="red"
                  helperTextWidth="200px"
                  value={puntaje}
                  onChange={(e) => setNuevoPuntaje(e.target.value)}
                />
                <Box sx={{ marginLeft: "0" }}>
                  <button
                    onClick={agregarCriterio}
                    className="botonClaro"
                    style={{ marginTop: "28px" }}
                  >
                    Añadir
                  </button>
                </Box>
              </Stack>
            </Box>
          )}
        </Paper>
        <button
          onClick={manejarEdicion}
          className="botonVerde"
          style={{ marginTop: "60px", marginBottom: "-22px"}}
        >
          Guardar cambios
        </button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": { padding: "1.7rem", borderRadius: "20px" },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Editar criterio"}
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
            }}
          >
            <TextField
              sx={{ width: "400px" }}
              id="outlined-multiline-static"
              label="Criterio"
              color="success"
              multiline
              rows={5}
              defaultValue={preguntaAEditar.pregunta}
            />
            <TextField
              sx={{ width: "100px", marginLeft: "20px" }}
              id="outlined-multiline-static-puntaje"
              color="success"
              label="Puntaje"
              defaultValue={preguntaAEditar.puntaje}
              type="number"
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 2rem 2rem 2rem",
          }}
        >
          <Button color="error" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleGuardarPregunta} autoFocus>
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar errores */}
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
  );
}
