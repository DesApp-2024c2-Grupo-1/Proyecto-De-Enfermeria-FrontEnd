import { useState, useEffect } from "react";
import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/AlumnoService";
import { Stack } from "@mui/material";

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
          />

          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={handleNavigate}
          />
        </Stack>
      </Stack>
    </>
  );
}
