import { useState, useEffect } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { useParams } from "react-router-dom";
import { getEvaluacionById } from "../services/EvaluacionRealizadaService";
import { createTheme } from "@mui/material/styles";
import { Snackbar, Alert, useMediaQuery, Button, Box } from "@mui/material";

export function VerEvaluacionPage() {
  const { id } = useParams();
  const [evaluacionRealizada, setEvaluacionRealizada] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchEvaluacionById = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacionRealizada(data);
    if (data.preguntaRespondida.length > 0) {
      setPreguntas(data.preguntaRespondida);
    } else {
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchEvaluacionById(id);
  }, [id]);

  console.log(evaluacionRealizada);

  const descargarEvaluacionComoPDF = () => {
    const element = document.getElementById("evaluacion-div");
    element.classList.add("printable");

    html2pdf()
      .from(element)
      .set({
        html2canvas: {
          width: 1080,
          scale: 2,
          scrollX: 0,
          scrollY: 0,
        },
      })
      .save("Evaluacion.pdf")
      .then(() => {
        element.classList.remove("printable");
      });
  };

  return (
    <>
      <div id="evaluacion-div">
        <Evaluacion
          lugar={evaluacionRealizada.lugarEvaluacion?.id}
          preguntas={preguntas}
          disabled={true}
          alumnoDisabled={true}
          alumnoPlaceholder={`${evaluacionRealizada.alumno?.nombre} ${evaluacionRealizada.alumno?.apellido}`}
          modificacionPuntaje={evaluacionRealizada.modificacionPuntaje}
          observacion={evaluacionRealizada.observacion}
          nota={evaluacionRealizada.nota}
        />
      </div>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <button
          className="botonVerde"
          style={{ marginTop: "-30px" }}
          onClick={descargarEvaluacionComoPDF}
        >
          Descargar
        </button>
      </Box>
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
