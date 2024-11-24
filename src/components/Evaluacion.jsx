import { Stack, Box } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";
import Button from "../components/Button";

const datos = [
  { nombre: "Maria Gonzalez", documento: "12345369" },
  { nombre: "Juan Perez", documento: "98765432" },
  { nombre: "Ana López", documento: "23456789" },
  { nombre: "Luis Rodríguez", documento: "34567890" },
  { nombre: "Sofia Torres", documento: "45678901" },
];

export function Evaluacion({ preguntas, disabled, alumnoDisabled, alumnoPlaceholder }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [alumno, setAlumno] = useState("");
  const { docenteContext } = useDocente()
  

  const handleRegister = async () => {
    navigate("/registerAlumnos");
  };

  const handleOnChange = (event) => {
    const inputDNI = event.target.value;
    setSearchTerm(inputDNI);
    console.log("DNI ingresado:", inputDNI);

    const foundAlumno = datos.find((dato) => dato.documento === inputDNI);
    if (foundAlumno) {
      setAlumno(foundAlumno.nombre);
    } else {
      setAlumno(inputDNI.length > 0 ? "Alumno no encontrado" : "");
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
