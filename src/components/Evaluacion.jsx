import { Stack, Box } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState } from "react";
import { Observacion } from "../components/Observacion";
import { Lugar } from "../components/Lugar";
import { useNavigate } from "react-router-dom";

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

  const handleRegister = async () => {
    // const alumnoData = { nombre, apellido, email, dni, password };
    // await registrarAlumno(alumnoData);
    navigate("/registerAlumno");
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

  // <Button text="Registrar" onClick={handleRegister} className="botonClaro"/>

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
          placeholder="Carlos Perez"
          titulo="Docente"
        />
        <Input 
          disabled={true}
          activo={false}
          placeholder="60%"
          titulo="Exigencia"
        />
      </Stack>

      <Box>
        <ListaPreguntas preguntas={preguntas}  disabled={disabled}/>
      </Box>

    </Stack>
  );
}
