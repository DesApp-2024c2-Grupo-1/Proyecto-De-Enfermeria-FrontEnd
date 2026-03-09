import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import {
  Stack,
  useMediaQuery,
  Pagination,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import IrArribaBoton from "../components/irArribaBoton";
import ListHeader from "../components/Header";
import DescargarExcelButtonAlumnos from "../components/exportExcelAlumnos";
import { FiPlus } from "react-icons/fi";

export function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const xs = useMediaQuery("(max-width:600px)");
  const keys = ["nombre", "apellido", "dni"];
  const [alumnos, setAlumnos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  const textosHeader = [
    { key: "nombre", value: "Nombre" },
    { key: "apellido", value: "Apellido" },
    { key: "dni", value: "DNI" },
  ];

  const handleBusqueda = (e) => {
    setPaginaActual(1);
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleRegisterAlumno = () => navigate("/registerAlumnos");

  useEffect(() => {
    const fetchAlumnos = async () => {
      const data = await getAllAlumnos();
      setAlumnos(data);
    };
    fetchAlumnos();
  }, []);

  const handleNavigate = (id) => {
    const alumno = alumnos.find((a) => a.id === id);
    navigate(`/perfilAlumno/${id}`, {
      state: { alumnoNombre: alumno.nombre, alumnoApellido: alumno.apellido },
    });
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
      <IrArribaBoton />

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
          Listado
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A3D2D", mt: 0.5, lineHeight: 1.2 }}
        >
          Alumnos
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
          <Tooltip title="Registrar alumno">
            <IconButton
              onClick={handleRegisterAlumno}
              size="small"
              sx={{
                border: "1px solid #e6e6e6",
                color: "#55B589",
                width: 30,
                height: 30,
                "&:hover": { borderColor: "#77C4A0", backgroundColor: "#f0faf7" },
              }}
            >
              <FiPlus size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <DescargarExcelButtonAlumnos />
          <Busqueda
            placeholder="Buscar alumno..."
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
            {!xs && <ListHeader textos={textosHeader} />}
            <Lista
              lista={alumnosPaginados}
              keys={keys}
              buttonOnClick={handleNavigate}
              paramOnClick="id"
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
                  className="fa fa-users"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  No hay alumnos registrados aún.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "#aac4b4", cursor: "pointer" }}
                  onClick={handleRegisterAlumno}
                >
                  Registrar un alumno
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
