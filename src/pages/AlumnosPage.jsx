import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { createTheme } from "@mui/material/styles";
import { Stack, useMediaQuery, Pagination } from "@mui/material";
import IrArribaBoton from "../components/irArribaBoton";

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
        alumnoNombre: alumnos.find((alumno) => alumno.id === id).nombre,
        alumnoApellido: alumnos.find((alumno) => alumno.id === id).apellido,
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
        <h1>Alumnos</h1>
        <Stack
          sx={{
            width: "55%",
          }}
        >
          <Busqueda
            placeholder="Buscar alumno..."
            onChange={handleBusqueda}
            width={xs ? "100%" : "200px"}
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
            <div>
              <h2>No se encontraron resultados</h2>
              <p>¿Necesita registrar un nuevo alumno?</p>
              <button className="botonClaro" onClick={handleRegisterAlumno}>
                Registrar
              </button>
            </div>
          )}
        </Stack>
      </Stack>
    </>
  );
}
