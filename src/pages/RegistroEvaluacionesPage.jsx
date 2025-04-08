import Busqueda from "../components/Busqueda";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Lista from "../components/Lista";

import {
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import { findAllAlumnosPorEvaluacion } from "../services/EvaluacionRealizadaService";

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [filtrado, setFiltrado] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const location = useLocation();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const evaluacionTitulo = location.state
    ? location.state.evaluacionTitulo
    : "Título no disponible";
  const { id } = useParams();

  const fetchAlumnosPorId = async (id) => {
    const data = await findAllAlumnosPorEvaluacion(id);
    setAlumnos(data);
    setAlumnosFiltrados(data);
  };

  useEffect(() => {
    fetchAlumnosPorId(id);
  }, [id]);

  const handleBusqueda = (e) => {
    let valor = e.target.value.toLowerCase();
    setSearchTerm(valor);
    if (valor === "") {
      setAlumnosFiltrados(alumnos);
      setFiltrado(false);
      return;
    }
    setAlumnosFiltrados(
      alumnos.filter(
        (alumno) =>
          String(alumno.nombre).toLowerCase().includes(valor) ||
          String(alumno.apellido).toLowerCase().includes(valor) ||
          String(alumno.dni).toLowerCase().includes(valor)
      )
    );
    setFiltrado(true);
  };

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacionTitulo}</h1>
        <Stack sx={{ width: "70%" }}>
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={handleBusqueda}
            width={xs ? "100%" : "200px"}
          />

          {alumnos.length > 0 ? (
            <>
              {!(filtrado && alumnosFiltrados.length === 0) ? (
                <Lista
                  dropdown={true}
                  lista={
                    alumnosFiltrados.length > 0 ? alumnosFiltrados : alumnos
                  }
                  keys={["nombre", "apellido", "dni"]}
                  contenidoDropdown={alumnosFiltrados.map(
                    (item) => item.evaluacionesRealizadas
                  )}
                  keysDropdown={["fecha", "nota"]}
                  buttonOnClick={(evaluacionId) =>
                    navigate(`/verEvaluacion/${evaluacionId}`)
                  }
                  paramOnClick={"id"}
                />
              ) : (
                <div>
                  <h2>No se encontraron resultados...</h2>
                  <p>¿Necesita evaluar a un alumno?</p>
                  <button
                    className="botonClaro"
                    onClick={() => navigate(`/registrarEvaluacion/${id}`)}
                  >
                    Evaluar
                  </button>
                </div>
              )}
            </>
          ) : (
            <Dialog
              open={openDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{
                "& .MuiDialog-paper": { padding: "2rem" },
              }}
            >
              <DialogTitle id="alert-dialog-title">
                {"No hay alumnos que hayan tomado esta evaluación."}
              </DialogTitle>

              <DialogActions>
                <Button
                  sx={{ color: "#1A3D2D" }}
                  onClick={() => navigate("/home")}
                >
                  Volver atrás
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Stack>
      </Stack>
    </>
  );
}
