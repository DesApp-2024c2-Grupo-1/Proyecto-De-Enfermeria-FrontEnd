import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { createTheme } from "@mui/material/styles";
import { Stack, useMediaQuery, Pagination, Box, Paper } from "@mui/material";
import IrArribaBoton from "../components/irArribaBoton";
import ListHeader from "../components/Header";
import DescargarExcelButton from "../components/exportExcel";

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
          <h1>Alumnos</h1>
          <DescargarExcelButton width={xs ? "100%" : "200px"} />
          <button className="botonClaro" onClick={handleRegisterAlumno}>
            Añadir alumno
          </button>
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
                  <h2>No se encontraron resultados</h2>
                  <p>¿Necesita registrar un nuevo alumno?</p>
                  <button className="botonClaro" onClick={handleRegisterAlumno}>
                    Registrar
                  </button>
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
                <Busqueda
                  placeholder="Buscar alumno..."
                  onChange={handleBusqueda}
                  width="200px"
                  height="25px"
                />
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
                  <h2>No se encontraron resultados</h2>
                  <p>¿Necesita registrar un nuevo alumno?</p>
                  <button className="botonClaro" onClick={handleRegisterAlumno}>
                    Registrar
                  </button>
                </Stack>
              )}
            </Paper>
          )}
        </Stack>
      </Stack>
    </>
  );
}
