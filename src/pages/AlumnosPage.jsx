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
  const navigate = useNavigate();
  const keys = ["nombre", "documento"];
  
  return (
    <>
      <div className="registroEvaluacionesContainer">
        <h1>Alumnos</h1>
        <div className="registroEvaluaciones">
          <Busqueda />
          <Lista
            lista={datos}
            keys={keys}
            buttonOnClick={() => navigate("/perfilAlumno")}
          />
        </div>
      </div>
    </>
  );
}
