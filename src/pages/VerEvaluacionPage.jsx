import { useState, useEffect } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { useParams } from "react-router-dom";
import { getEvaluacionById } from "../services/EvaluacionRealizadaService";
import { Snackbar, Alert } from "@mui/material";

export function VerEvaluacionPage() {
  const { id } = useParams();
  const [evaluacionRealizada, setEvaluacionRealizada] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacionRealizada(data);
    if (data.preguntaRespondida) {
      setPreguntas(data.preguntaRespondida);
    } else {
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);

  return (
    <>
      <Evaluacion
        lugar={evaluacionRealizada.lugarPractica}
        preguntas={preguntas}
        disabled={true}
        alumnoDisabled={true}
        alumnoPlaceholder={`${evaluacionRealizada.alumno?.nombre} ${evaluacionRealizada.alumno?.apellido}`}
      />

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
          <p>
            ¡Ocurrió un problema con la información de esta página!</p><p>Por favor, contacta a un
            administrador.
          </p>
        </Alert>
      </Snackbar>
    </>
  );
}
