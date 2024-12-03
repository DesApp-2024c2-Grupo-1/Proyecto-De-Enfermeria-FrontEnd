import { Stack, Box } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";
import Button from "../components/Button";
import { getAllAlumnos } from "../services/alumnoService";

export function Evaluacion({ preguntas, disabled, alumnoDisabled, alumnoPlaceholder }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumno, setAlumno] = useState("");
  const [alumnos, setAlumnos] = useState([])
  const { docenteContext } = useDocente()

  const handleRegister = async () => {
    navigate("/registerAlumnos");
  };

  const fetchAlumnos = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data)
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleOnChange = (event) => {
    const inputDNI = event.target.value;
    setSearchTerm(inputDNI);
    console.log("DNI ingresado:", inputDNI);

    const foundAlumno = alumnos.find((dato) => String(dato.dni) === inputDNI);
    console.log(foundAlumno)
    if (foundAlumno) {
      setAlumno(`Evaluando a ${foundAlumno.nombre} ${foundAlumno.apellido}`);
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
        justifyContent: "space-between" 
      }}
    >
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        sx={{ 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}
      >
        <Input 
          onChange={handleOnChange}
          disabled={alumnoDisabled}
          placeholder={alumnoPlaceholder || "Ingresar DNI:"}
          titulo="Alumno"
          helperText={alumno}
          helperTextColor={alumno === "Alumno no encontrado" ? "red" : "#429870"}
        />
        <Input 
          disabled={true}
          activo={false}
          placeholder={`${docenteContext.nombre} ${docenteContext.apellido}`}
          titulo="Docente"
        />
        <Input 
          disabled={true}
          activo={false}
          placeholder="60%"
          titulo="Exigencia"
        />
      </Stack>
      {alumno === "Alumno no encontrado" && (
          <Button
          text="Registrar"
          className="botonClaro"
          onClick={handleRegister}
          style={{borderRadius: 5}}
        />
        )}
      <Box>
        <ListaPreguntas preguntas={preguntas}  disabled={disabled}/>
      </Box>

    </Stack>
  );
}
