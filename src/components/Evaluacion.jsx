import { Stack, Box } from "@mui/material";
import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";

export function Evaluacion({
  preguntas,
  disabled,
  alumnoDisabled,
  alumnoPlaceholder,
}) {
  return (
    <>
      <Stack
        spacing={5}
        sx={{
          mx: "20%",
          my: "5rem",
          justifyContent: "space-between",
          /*backgroundColor: "red",*/
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
            disabled={alumnoDisabled}
            placeholder={"Ingresar DNI:" || alumnoPlaceholder}
            titulo={"Alumno"}
            
          /> 
          <Input
            disabled={true}
            activo={false}
            placeholder={"Carlos Perez"}
            titulo={"Docente"}
          ></Input>
        </Stack>
        <Box>
          <ListaPreguntas preguntas={preguntas} disabled={disabled} />
        </Box>
      </Stack>
    </>
  );
}
