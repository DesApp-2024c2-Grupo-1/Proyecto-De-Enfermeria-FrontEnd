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
import ListaConDropdown from "../components/ListaConDropdown";

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);
  const location = useLocation();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const evaluacionTitulo = location.state
    ? location.state.evaluacionTitulo
    : "Título no disponible";

  const keys = ["nombre", "apellido", "dni"];
  const { id } = useParams();

  const listaFiltrada =
    searchTerm.length >= 7
      ? alumnos.filter((alumno) => String(alumno.dni).includes(searchTerm))
      : alumnos;

  const fetchAlumnosPorId = async (id) => {
    const data = await findAllAlumnosPorEvaluacion(id);
    setAlumnos(data);
  };

  useEffect(() => {
    fetchAlumnosPorId(id);
  }, [id]);

  const handleNavigate = (alumnoId) => {
    const alumno = listaFiltrada.find((alumno) => alumno.alumnoId === alumnoId);

    navigate(`/evaluacionesPorAlumno/${id}/${alumno.alumnoId}`, {
      state: {
        evaluacionTitulo: evaluacionTitulo,
        evaluacionId: id,
        alumnoNombre: alumno.nombre,
        alumnoApellido: alumno.apellido,
        alumnoId: alumnoId,
      },
    });
  };

const listaPrueba = [
  {
    nombre: "Juan",
    apellido: "Pérez",
    dni: 12345678,
    evaluaciones: [
      { id: 1, nombre: "Evaluación 1" },
      { id: 2, nombre: "Evaluación 2" },
    ],  

  },
  {
    nombre: "María",
    apellido: "Gómez",
    dni: 87654321,
    evaluaciones: [
      { id: 3, nombre: "Evaluación 3" },
      { id: 4, nombre: "Evaluación 4" },
    ],
  },
  {
    nombre: "Pedro",
    apellido: "López",
    dni: 11223344,
    evaluaciones: [
      { id: 5, nombre: "Evaluación 5" },
      { id: 6, nombre: "Evaluación 6" },
    ],
  },
  {
    nombre: "Ana",
    apellido: "Martínez",
    dni: 55667788,
    evaluaciones: [
      { id: 7, nombre: "Evaluación 7" },
      { id: 8, nombre: "Evaluación 8" },
    ],
  },
]

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>{evaluacionTitulo}</h1>
        <Stack sx={{ width: "70%" }}>
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
            width={xs ? "100%" : "200px"}
          />

          {listaFiltrada.length > 0 ? (
            <Lista dropdown={true} lista={listaFiltrada} keys={keys} contenidoDropdown={listaPrueba.map((item) => item.evaluaciones)}/>
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
