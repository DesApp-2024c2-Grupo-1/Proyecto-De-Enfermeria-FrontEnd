import { Stack, Box } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";
import { getAllAlumnos } from "../services/AlumnoService";

export function Evaluacion({
  preguntas,
  disabled,
  alumnoDisabled,
  alumnoPlaceholder,
  lugar
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumno, setAlumno] = useState("");
  const [alumnoEvaluado, setAlumnoEvaluado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const { docenteContext } = useDocente();

  const handleRegister = async () => {
    navigate("/registerAlumnos");
  };

  const fetchAlumnos = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleOnChange = (event) => {
    const inputDNI = event.target.value;
    setSearchTerm(inputDNI);
  
    const encontrado = alumnos.find((dato) => String(dato.dni) === inputDNI) || null;
    setAlumnoEvaluado(encontrado);
  
    if (encontrado) {
      setAlumno(`Evaluando a ${encontrado.nombre} ${encontrado.apellido}`);
    } else {
      setAlumno(inputDNI.length >= 7 ? "Alumno no encontrado" : "");
    }
  };

  return (
    <Stack
      spacing={5}
      sx={{
        mx: "20%",
        my: "5rem",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          onChange={handleOnChange}
          disabled={alumnoDisabled}
          placeholder={alumnoPlaceholder || "Ingresar DNI:"}
          titulo="Alumno"
          backgroundColor={"#DDF0E7"}
          helperText={alumno}
          helperTextColor={
            alumno === "Alumno no encontrado" ? "red" : "#429870"
          }
        />
        <Input
          backgroundColor={"#DDF0E7"}
          disabled={true}
          activo={false}
          placeholder={`${docenteContext.nombre} ${docenteContext.apellido}`}
          titulo="Docente"
        />
        <Input
          backgroundColor={"#DDF0E7"}
          disabled={true}
          activo={false}
          placeholder="60%"
          titulo="Exigencia"
        />
      </Stack>
      {alumno === "Alumno no encontrado" && (
        <button className="botonClaro" onClick={handleRegister}>
            Registrar
        </button>
      )}
      <Box>
        <ListaPreguntas preguntas={preguntas} disabled={disabled} alumno={alumnoEvaluado} lugar={lugar} />
      </Box>
    </Stack>
  );
}
