import { useState, useEffect } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { useParams } from "react-router-dom";
import { getEvaluacionById } from "../services/EvaluacionService";
import { createTheme } from "@mui/material/styles";
import {
  Snackbar,
  Alert,
  useMediaQuery,
  Button,
  Box,
  Stack,
} from "@mui/material";

export function EvaluacionDeshabilitadaPage() {
  const { id } = useParams();
  const [evaluacion, setEvaluacion] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacion(data);
    if (data.preguntas.length > 0) {
      setPreguntas(data.preguntas);
    } else {
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);

  console.log(evaluacion);

  return (
    <>
      <h1>
        {evaluacion.titulo} - V{evaluacion.version}
      </h1>
      <div id="evaluacion-div">
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Fecha de alta: {evaluacion.altaFecha}</p>
          {evaluacion.bajaFecha === "1/1/1970" /* fix provisional */ ? (
            <p>Esta es la versión actual de la evaluación.</p>
          ) : (
           <p> Fecha de baja: {evaluacion.bajaFecha}</p>
          )}
        </Stack>
        <Evaluacion
          lugar={evaluacion.lugarEvaluacion?.id}
          preguntas={preguntas}
          disabled={true}
          alumnoDisabled={true}
          alumnoPlaceholder={"DNI del Alumno"}
          modificacionPuntaje={""}
          observacion={""}
        />
      </div>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      ></Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          width: { xs: "100%", sm: "75%", md: "50%" },
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
          <p>¡Ocurrió un problema con la información de esta página!</p>
          <p>Por favor, contacta a un administrador.</p>
        </Alert>
      </Snackbar>
    </>
  );
}
