import Busqueda from "../components/Busqueda";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Lista from "../components/Lista";
import DescargarExcelButton from "../components/exportExcel";
import {
  Stack,
  useMediaQuery,
  Pagination,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { findAllAlumnosPorEvaluacion } from "../services/EvaluacionRealizadaService";

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const location = useLocation();
  const xs = useMediaQuery("(max-width:600px)");
  const evaluacionTitulo = location.state?.evaluacionTitulo ?? "Título no disponible";
  const { id } = useParams();
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  useEffect(() => {
    const fetchAlumnos = async () => {
      const data = await findAllAlumnosPorEvaluacion(id);
      setAlumnos(data);
    };
    fetchAlumnos();
  }, [id]);

  const handleBusqueda = (e) => {
    setPaginaActual(1);
    setSearchTerm(e.target.value.toLowerCase());
  };

  const listaFiltrada = alumnos.filter(
    (alumno) =>
      String(alumno.nombre).toLowerCase().includes(searchTerm) ||
      String(alumno.apellido).toLowerCase().includes(searchTerm) ||
      String(alumno.dni).toLowerCase().includes(searchTerm)
  );

  const paginasTotales = Math.ceil(listaFiltrada.length / itemsPorPagina);
  const alumnosPaginados = listaFiltrada.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: { xs: 4, sm: 5 },
          pb: { xs: 3, sm: 4 },
          borderBottom: "1px solid #e8f1ec",
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "#5a9e7c", fontWeight: 600, letterSpacing: "0.12em" }}
        >
          Registro de evaluaciones
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A3D2D", mt: 0.5, lineHeight: 1.2 }}
        >
          {evaluacionTitulo}
        </Typography>
      </Box>

      {/* Toolbar */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: 4,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1A3D2D" }}>
            Estudiantes
          </Typography>
          <Chip
            label={alumnos.length}
            size="small"
            sx={{
              backgroundColor: "#d7f0dc",
              color: "#1A3D2D",
              fontWeight: 700,
              height: "22px",
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <DescargarExcelButton idEvaluacion={id} />
          <Busqueda
            placeholder="Buscar un alumno..."
            onChange={handleBusqueda}
            width={xs ? "100%" : "220px"}
            height="46px"
          />
        </Stack>
      </Box>

      {/* Contenido */}
      <Box sx={{ px: { xs: 3, sm: 6 }, pb: 8 }}>
        {listaFiltrada.length > 0 ? (
          <>
            <Lista
              dropdown={true}
              lista={alumnosPaginados}
              keys={["nombre", "apellido", "dni"]}
              contenidoDropdown={alumnosPaginados.map(
                (item) => item.evaluacionesRealizadas
              )}
              keysDropdown={["fecha", "nota"]}
              buttonOnClick={(evaluacionId) =>
                navigate(`/verEvaluacion/${evaluacionId}`)
              }
              paramOnClick={"id"}
            />
            {listaFiltrada.length > itemsPorPagina && (
              <Stack mt={3} alignItems="center">
                <Pagination
                  count={paginasTotales}
                  page={paginaActual}
                  onChange={(_, value) => setPaginaActual(value)}
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#1A3D2D",
                      color: "#fff",
                    },
                  }}
                />
              </Stack>
            )}
          </>
        ) : (
          <Box sx={{ mt: 8, textAlign: "center", color: "#8ab09a" }}>
            {searchTerm ? (
              <>
                <i
                  className="fa fa-search"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  No se encontraron alumnos para "{searchTerm}"
                </Typography>
              </>
            ) : (
              <>
                <i
                  className="fa fa-clipboard"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  Ningún alumno ha tomado esta evaluación aún.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "#aac4b4", cursor: "pointer" }}
                  onClick={() => navigate(`/registrarEvaluacion/${id}`)}
                >
                  Evaluar un alumno
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
