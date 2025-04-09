import { useState, useEffect } from "react";
import { Evaluacion } from "../components/Evaluacion";
import { useParams } from "react-router-dom";
import { getEvaluacionById } from "../services/EvaluacionRealizadaService";
import { Snackbar, Alert, Button } from "@mui/material";
import html2pdf from 'html2pdf.js';


const exportarEvaluacionComoPDF = () => {
  const element = document.getElementById('evaluacion-container');

  const opt = {
    margin:       10,
    filename:     'Evaluación.pdf',
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};



export function VerEvaluacionPage() {
  const { id } = useParams();
  const [evaluacionRealizada, setEvaluacionRealizada] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  return (
    <>
      <div id="evaluacion-container" style={{ paddingBottom: "2rem" }}>
        <Evaluacion
          lugar={evaluacionRealizada.lugarPractica}
          preguntas={preguntas}
          disabled={true}
          alumnoDisabled={true}
          alumnoPlaceholder={`${evaluacionRealizada.alumno?.nombre} ${evaluacionRealizada.alumno?.apellido}`}
          modificacionPuntaje={evaluacionRealizada.modificacionPuntaje}
          observacion={evaluacionRealizada.observacion}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="botonVerde"
          style={{ marginTop: "3rem" }}
          onClick={exportarEvaluacionComoPDF}
        >
          {" "}
          Descargar{" "}
        </button>
      </div>
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
