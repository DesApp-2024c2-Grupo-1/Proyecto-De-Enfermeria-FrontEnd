import { useState } from "react";
import { Input } from "../components/Input";
import { Box, Stack } from "@mui/material";

const datosDocente = [
  { nombre: "Carlos" },
  { apellido: "Perez" },
  { email: "carlos.perez@estudiantes.unahur.edu.ar" },
  { dni: "33456978" },
];

const labels = ["Nombre", "Apellido", "Email", "DNI"];

export function PerfilDocentePage() {
  const [editando, setEditando] = useState(false);

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
          const key = Object.keys(dato)[0];
          return (
            <Input
              width="25rem"
              key={key}
              disabled={editando}
              activo={false}
              placeholder={dato[key]}
              titulo={labels[index]}
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
