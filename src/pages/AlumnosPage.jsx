import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { Stack, Box } from "@mui/material";

export function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleNavigate = (dni) => {
    navigate(`/perfilAlumno/${dni}`);
  };

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <h1>Alumnos</h1>
        <Stack
          sx={{
            width: "80%",
            justifyContent: "center",
          }}
          spacing={2}
        >
          <Box>
            <Busqueda
              placeholder="Buscar por DNI..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box>
            <Lista
              lista={listaFiltrada}
              keys={keys}
              buttonOnClick={handleNavigate}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
