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
  const listaFiltrada =
    searchTerm.length >= 7
      ? alumnos.filter((alumno) => String(alumno.dni).includes(searchTerm))
      : alumnos;

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
            width: "70%",
          }}
        >
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
            width={xs ? "100%" : "200px"}
          />

          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={handleNavigate}
            paramOnClick="id"
          />
        </Stack>
      </Stack>
    </>
  );
}
