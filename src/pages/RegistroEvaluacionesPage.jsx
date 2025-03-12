import Busqueda from "../components/Busqueda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";

const datos = [
  { nombre: "Maria Gonzalez", documento: "12345369" },
  { nombre: "Juan Perez", documento: "98765432" },
  { nombre: "Ana López", documento: "23456789" },
  { nombre: "Luis Rodríguez", documento: "34567890" },
  { nombre: "Sofia Torres", documento: "45678901" },
];

export function RegistroEvaluacionesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const keys = ["nombre", "documento"];
  const listaFiltrada =
    searchTerm.length >= 7
      ? datos.filter((dato) => String(dato.documento).includes(searchTerm))
      : datos;

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>Lavado de manos</h1>
        <Stack sx={{ width: "70%", }}>
          <Busqueda
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={() => navigate("/evaluacionesPorAlumno")}
          />
        </Stack>
      </Stack>
    </>
  );
}
