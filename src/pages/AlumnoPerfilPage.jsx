import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllEvaluacionesRealizadasPorAlumno } from "../services/EvaluacionRealizadaService";
import {
  Stack,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  createTheme
} from "@mui/material";

export function AlumnoPerfilPage() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);
  const keys = ["fecha", "nota"];
  const navigate = useNavigate();
  const location = useLocation();
  const alumnoNombre = location.state.alumnoNombre;
  const alumnoApellido = location.state.alumnoApellido;
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const { idAlumno } = useParams();

  const evaluacionesTitulos = Array.from(
    new Set(evaluaciones.map((evaluacion) => evaluacion.evaluacion.titulo))
  );

  const evaluacionesFiltradas = evaluacionesTitulos.map((titulo) => {
    return {
      titulo: titulo,
      instancias: evaluaciones.filter(
        (evaluacion) => evaluacion.evaluacion.titulo === titulo
      ),
    };
  });

  const fetchEvaluacionesPorAlumno = async (id) => {
    const data = await getAllEvaluacionesRealizadasPorAlumno(id);
    setEvaluaciones(data);
  };

  useEffect(() => {
    fetchEvaluacionesPorAlumno(idAlumno);
  }, [idAlumno]);

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <h1>
          {alumnoNombre} {alumnoApellido}
        </h1>
        {evaluacionesFiltradas.length > 0 ? (
          <Box sx={{ width: xs ? "88%" : "60%", display: "flex", flexDirection: "column" }}>
            {evaluacionesFiltradas.map((evaluacion, index) => (
              <Lista
                key={index}
                titulo={evaluacion.titulo}
                lista={evaluacion.instancias}
                keys={keys}
                buttonOnClick={(id) => navigate(`/verEvaluacion/${id}`)}
                paramOnClick="id"
              />
            ))}
          </Box>
        ) : (
          <Dialog
            open={openDialog}
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
              {"El o la estudiante no ha tomado ninguna evaluación."}
            </DialogTitle>

            <DialogActions>
              <Button
                variant="outlined"
                sx={{
                  color: "#1A3D2D",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#1A3D2D",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    color: "#1A3D2D",
                    borderColor: "#FFFFFF",
                  },
                  width: "120px",
                }}
                onClick={() => navigate("/alumnos")}
              >
                Volver atrás
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Stack>
    </>
  );
}
