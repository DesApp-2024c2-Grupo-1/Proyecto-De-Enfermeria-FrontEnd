import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { createTheme } from "@mui/material/styles";
import { Stack, useMediaQuery } from "@mui/material";
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
  
 
  const handleBusqueda = (e) => {
    let valor = (e.target.value).toLowerCase();
    setSearchTerm(valor);
    if (valor === "") {
      setAlumnosFiltrados([]);
      setFiltrado(false);
      return;
    }
    setAlumnosFiltrados(alumnos.filter((alumno) => String(alumno.nombre).toLowerCase().includes(valor) || String(alumno.apellido).toLowerCase().includes(valor) || String(alumno.dni).toLowerCase().includes(valor)));
    setFiltrado(true);
  }


  const fetchAlumnos = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data);
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

  return (
    <>
    <IrArribaBoton/>
      <Stack sx={{ alignItems: "center" }}>
        <h1>Alumnos</h1>
        <Stack
          sx={{
            width: "75%",
          }}
        >
          <Busqueda
            placeholder="Buscar alumno..."
            onChange={handleBusqueda}
            width={xs ? "100%" : "200px"}
          />

          <Lista
            lista={filtrado ? alumnosFiltrados : alumnos}
            keys={keys}
            buttonOnClick={handleNavigate}
            paramOnClick="id"
          />
        </Stack>
      </Stack>
    </>
  );
}
