import { Stack, Box, Chip } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";
import { getAllAlumnos } from "../services/AlumnoService";
import { Observacion } from "./Observacion";

export function Evaluacion({
  preguntas,
  disabled,
  alumnoDisabled,
  alumnoPlaceholder,
  lugar,
  modificacionPuntaje,
  observacion,
  nota,
  viendoHistorial,
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

    const encontrado =
      alumnos.find((dato) => String(dato.dni) === inputDNI) || null;
    setAlumnoEvaluado(encontrado);

    if (encontrado) {
      setAlumno(`Evaluando a ${encontrado.nombre} ${encontrado.apellido}`);
    } else {
      setAlumno(inputDNI.length >= 7 ? "Alumno no encontrado" : "");
    }
  };

  console.log(nota);

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
      <Stack>
        {disabled && viendoHistorial !== "true" && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Chip
              label={`Nota obtenida: ${nota}`}
              sx={{
                backgroundColor:
                  (nota ? parseFloat(nota.replace("%", "")) : nota) < 60
                    ? "#FFF5D6"
                    : "#DDF0E7",
                color:
                  (nota ? parseFloat(nota.replace("%", "")) : nota) < 60
                    ? "#E0A800"
                    : "#429870",

                textAlign: "center",

                fontSize: "1.2rem",
                mb: 2,
              }}
            />
          </Box>
        )}
        <ListaPreguntas
          preguntas={preguntas}
          disabled={disabled}
          alumno={alumnoEvaluado}
          lugar={lugar}
          modificacionPuntajeValue={modificacionPuntaje}
          observacionValue={observacion}
        />
      </Stack>
    </Stack>
  );
}
