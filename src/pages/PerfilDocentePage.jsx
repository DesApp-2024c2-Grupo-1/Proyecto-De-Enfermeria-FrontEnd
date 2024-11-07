import { useState } from "react";
import { Input } from "../components/Input";
import { Box, Stack } from "@mui/material";

const datosDocente = [
  { nombre: "Carlos", modificable: false },
  { apellido: "Perez", modificable: false },
  { email: "carlos.perez@estudiantes.unahur.edu.ar", modificable: true },
  { dni: "33456978", modificable: false },
];

const keyValues = ["nombre", "apellido", "email", "dni"];

export function PerfilDocentePage() {
  const [editando, setEditando] = useState(true);

  const handleClick = () => {
    setEditando(!editando);
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{ display: "flex", alignItems: "center", my: "2rem" }}
      >
        <Box className="perfilCirculo">CP</Box>
        {datosDocente.map((dato, index) => {
          const key = keyValues[index];
          return (
            <Input
              width="25rem"
              key={key}
              disabled={editando || !dato.modificable}
              placeholder={dato[key]}
              titulo={
                key == "dni"
                  ? "DNI"
                  : key.charAt(0).toUpperCase() + key.slice(1)
              }
            />
          );
        })}
        <button className="botonVerde" onClick={handleClick}>
          {editando ? "Editar" : "Guardar"}
        </button>
      </Stack>
    </>
  );
}
