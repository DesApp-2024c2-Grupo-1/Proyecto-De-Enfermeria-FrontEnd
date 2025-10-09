import { Stack, Box, Chip, useMediaQuery } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";
import { getAllAlumnos } from "../services/AlumnoService";
import { createTheme } from "@mui/material/styles";

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
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

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
        mb: "2rem",
        mt: "5rem",
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
          placeholder={
            viendoHistorial == "true"
              ? "Nombre del Docente"
              : `${docenteContext.nombre} ${docenteContext.apellido}`
          }
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
        {xs ? (
          <ListaPreguntas
            preguntas={preguntas}
            disabled={disabled}
            alumno={alumnoEvaluado}
            lugar={lugar}
            modificacionPuntajeValue={modificacionPuntaje}
            observacionValue={observacion}
            viendoHistorial={viendoHistorial}
          />
        ) : (
          <Box
            sx={{
              backgroundColor: "#f9fbfa",
              borderRadius: "16px",
              p: 4,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              maxWidth: "100%",
              mt: 3,
            }}
          >
            <ListaPreguntas
              preguntas={preguntas}
              disabled={disabled}
              alumno={alumnoEvaluado}
              lugar={lugar}
              modificacionPuntajeValue={modificacionPuntaje}
              observacionValue={observacion}
              viendoHistorial={viendoHistorial}
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
