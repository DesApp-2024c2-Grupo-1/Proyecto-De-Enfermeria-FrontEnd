import { useState } from "react";
import { Input } from "../components/Input";
import { Box, Stack } from "@mui/material";
import { useDocente } from "../context/DocenteContext";

export function PerfilDocentePage() {
  const [editando, setEditando] = useState(true);
  const { docenteContext } = useDocente();

  console.log("docenteContext:", docenteContext);

  const docenteData = docenteContext
    ? {
        ...docenteContext,
        email: docenteContext.email,
        modificable: true,
      }
    : null;

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
        <Box className="perfilCirculo">
          {docenteData?.nombre?.charAt(0)}
          {docenteData?.apellido?.charAt(0)}
        </Box>

        <Input
          key="nombre"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          placeholder={docenteContext?.nombre || "Nombre no definido"}
          titulo="Nombre"
        />

        <Input
          key="apellido"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          placeholder={docenteContext?.apellido || "Apellido no definido"}
          titulo="Apellido"
        />

        <Input
          width="25rem"
          backgroundColor={"#DDF0E7"}
          key="email"
          disabled={true}
          placeholder={docenteContext?.email || "Email no definido"}
          titulo="Email"
        />

        <button className="botonVerde" onClick={handleClick}>
          {editando ? "Editar" : "Guardar"}
        </button>
      </Stack>
    </>
  );
}
