import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { createTheme } from "@mui/material/styles";
import {
  Stack,
  useMediaQuery,
  Pagination,
  Box,
  Paper,
  Button,
} from "@mui/material";
import IrArribaBoton from "../components/irArribaBoton";
import ListHeader from "../components/Header";
import DescargarExcelButtonAlumnos from "../components/exportExcelAlumnos";
import { FiPlus } from "react-icons/fi";

export function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const keys = ["nombre", "apellido", "dni"];
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [filtrado, setFiltrado] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  const textosHeader = [
    { key: "nombre", value: "Nombre" },
    { key: "apellido", value: "Apellido" },
    { key: "dni", value: "DNI" },
  ];

  const handleBusqueda = (e) => {
    let valor = e.target.value.toLowerCase();
    setPaginaActual(1);
    setSearchTerm(valor);
    if (valor === "") {
      setAlumnosFiltrados([]);
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

  const handleRegisterAlumno = async () => {
    navigate("/registerAlumnos");
  };

  const fetchAlumnos = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data);
    setAlumnosFiltrados(data);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/perfilAlumno/${id}`, {
      state: {
        alumnoNombre: alumnos.find((a) => a.id === id).nombre,
        alumnoApellido: alumnos.find((a) => a.id === id).apellido,
      },
    });
  };

  const listaAMostrar = filtrado ? alumnosFiltrados : alumnos;
  const paginasTotales = Math.ceil(listaAMostrar.length / itemsPorPagina);
  const alumnosPaginados = listaAMostrar.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const handleCambioPagina = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <>
      <IrArribaBoton />
      <Stack sx={{ alignItems: "center" }}>
        {/* Header principal */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{
            px: xs ? "1.5rem" : 0,
            mb: -7,
            width: xs ? "88%" : "60%",
          }}
        >
          <Stack direction="row" alignItems="center">
            <h1>Alumnos</h1>
            <Button
              variant="contained"
              onClick={handleRegisterAlumno}
              sx={{
                marginLeft: 1.5,
                minWidth: 0,
                boxShadow: 0,
                width: 30,
                height: 30,
                borderRadius: "50%",
                padding: 0,
                textTransform: "none",
                backgroundColor: "transparent",
                border: "#e6e6e6 solid 1px",
                color: "#55B589",
                "&:hover": {
                  borderColor: "#77C4A0",
                  backgroundColor: "#f0faf7",
                  boxShadow: 0,
                },
              }}
            >
              <FiPlus size={22} />
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center">
            <DescargarExcelButtonAlumnos width={xs ? "100px" : "100px"} />

            {!xs && (
              <Box sx={{marginLeft: 2}}>
              <Busqueda
                placeholder="Buscar alumno..."
                onChange={handleBusqueda}
                width="200px"
              />
              </Box>
            )}
          </Stack>
        </Stack>

        {/* Contenido principal */}
        <Stack sx={{ width: xs ? "88%" : "60%" }}>
          {xs ? (
            <>
              <Busqueda
                placeholder="Buscar alumno..."
                onChange={handleBusqueda}
                width="100%"
              />
              {!(filtrado && alumnosFiltrados.length === 0) ? (
                <>
                  <Lista
                    lista={alumnosPaginados}
                    keys={keys}
                    buttonOnClick={handleNavigate}
                    paramOnClick="id"
                  />
                  {listaAMostrar.length > itemsPorPagina && (
                    <Stack mt={2} alignItems="center">
                      <Pagination
                        count={paginasTotales}
                        page={paginaActual}
                        onChange={handleCambioPagina}
                      />
                    </Stack>
                  )}
                </>
              ) : (
                <Stack alignItems="center" py={3}>
                  <h2>¡No se encontraron resultados!</h2>
                  <p>¿Necesitás registrar un nuevo alumno? Hacé clic {xs ? " " : " "}
                  <span style={{ cursor: 'pointer' }} onClick={handleRegisterAlumno}>
                     <u><b>acá.</b></u>
                  </span></p>
                </Stack>
              )}
            </>
          ) : (
            <Paper
              sx={{
                borderRadius: 3,
                pt: 2,
                pb: 3,
                px: 5,
                mx: -2,
                boxShadow: "1px 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <ListHeader key={keys} textos={textosHeader} />
              </Stack>

              {!(filtrado && alumnosFiltrados.length === 0) ? (
                <>
                  <Lista
                    lista={alumnosPaginados}
                    keys={keys}
                    buttonOnClick={handleNavigate}
                    paramOnClick="id"
                  />

                  {listaAMostrar.length > itemsPorPagina && (
                    <Stack mt={2} alignItems="center">
                      <Pagination
                        count={paginasTotales}
                        page={paginaActual}
                        onChange={handleCambioPagina}
                      />
                    </Stack>
                  )}
                </>
              ) : (
                <Stack alignItems="center" py={3}>
                  <h2>¡No se encontraron resultados!</h2>
                  <p>¿Necesitás registrar un nuevo alumno? Hacé clic {xs ? " " : " "}
                  <span style={{ cursor: 'pointer' }} onClick={handleRegisterAlumno}>
                     <u><b>acá.</b></u>
                  </span></p>
                </Stack>
              )}
            </Paper>
          )}
        </Stack>
      </Stack>
    </>
  );
}
