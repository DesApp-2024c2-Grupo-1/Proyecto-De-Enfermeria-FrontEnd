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
  createTheme,
} from "@mui/material";
import ListaCards from "../components/ListaCards";
import AlumnoPerfilHeader from "../components/AlumnoPerfilHeader";
import Busqueda from "../components/Busqueda";

export function AlumnoPerfilPage() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);
  const keys = ["fecha", "nota"];
  const navigate = useNavigate();
  const location = useLocation();
  const alumnoNombre = location.state?.alumnoNombre;
  const alumnoApellido = location.state?.alumnoApellido;
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const { idAlumno } = useParams();

  useEffect(() => {
    if (!location.state || !location.state.alumnoNombre) {
      navigate("/401", { replace: true });
    }
  }, [location.state, navigate]);

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
    <Stack
      sx={{
        width: xs ? "85%" : "100%",
        px: { xs: 2, sm: 3, md: 0 },
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900, mt: 3 }}>
        <AlumnoPerfilHeader
          alumnoNombre={alumnoNombre}
          alumnoApellido={alumnoApellido}
          evaluaciones={evaluaciones}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          justifyContent: xs ? "space-between" : "flex-end",
          mt: -5,
          mr: -4.65,
        }}
      >
        <Busqueda width={300} placeholder={"Buscar por título..."} />
      </Box>

      {evaluacionesFiltradas.length > 0 ? (
        <Box sx={{ width: "100%", maxWidth: 900, mt: 3 }}>
          {evaluacionesFiltradas.map((evaluacion, index) => (
            <ListaCards
              key={index}
              titulo={evaluacion.titulo}
              lista={evaluacion.instancias}
              keys={["fecha", "nota"]}
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
  );
}
