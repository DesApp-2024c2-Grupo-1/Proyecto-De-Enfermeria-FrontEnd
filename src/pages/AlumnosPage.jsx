import React, { useState } from "react";
import Busqueda from "../components/busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";

const datos = [
  { nombre: "Maria Gonzalez", documento: "12345369" },
  { nombre: "Juan Perez", documento: "98765432" },
  { nombre: "Ana López", documento: "23456789" },
  { nombre: "Luis Rodríguez", documento: "34567890" },
  { nombre: "Sofia Torres", documento: "45678901" },
];

export function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const keys = ["nombre", "documento"];
  const listaFiltrada = searchTerm.length >= 7 ? datos.filter((alumno) =>
    alumno.documento.includes(searchTerm)) : datos;

  return ( 
    <>
      <div className="registroEvaluacionesContainer">
        <h1>Alumnos</h1>
        <div className="registroEvaluaciones">
          <Busqueda 
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={() => navigate("/perfilAlumno")}
          />
        </div>
      </div>
    </>
  );
}
