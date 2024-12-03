import Busqueda from "../components/busqueda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";

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
  const listaFiltrada = searchTerm.length >= 7 ? datos.filter((dato) => 
    String(dato.documento).includes(searchTerm)) : datos;

  return (
    <>
      <div className="registroEvaluacionesContainer">
        <h1>Lavado de manos</h1>
        <div className="registroEvaluaciones">
          <Busqueda 
            placeholder="Buscar por DNI..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Lista
            lista={listaFiltrada}
            keys={keys}
            buttonOnClick={() => navigate("/evaluacionesPorAlumno")}
          />
        </div>
      </div>
    </>
  );
}
