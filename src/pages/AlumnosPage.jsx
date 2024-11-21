import { useState, useEffect } from "react";
import Busqueda from "../components/busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { getAllAlumnos } from "../services/alumnoService";

export function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  const keys = ["nombre", "apellido", "dni"]
  const [alumnos, setAlumnos] = useState([]);
  const listaFiltrada = searchTerm.length >= 7 ? alumnos.filter((alumno) => 
    String(alumno.dni).includes(searchTerm)) : alumnos;

  const fetchAlumnos = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data)
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleNavigate = (dni) => {
    navigate(`/perfilAlumno/${dni}`);
  };


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
            buttonOnClick={handleNavigate}
          />
        </div>
      </div>
    </>
  );
}
