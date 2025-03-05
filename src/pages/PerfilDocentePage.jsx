import { useState } from "react";
import { Input } from "../components/Input";
import { Box, Stack, Snackbar, Alert } from "@mui/material";
import { useDocente } from "../context/DocenteContext";
import { modificarDocente } from "../services/DocenteService";
import { useNavigate } from "react-router-dom";

export function PerfilDocentePage() {
  const [editando, setEditando] = useState(true);
  const { docenteContext, setDocenteContext } = useDocente();
  const [nombre, setNombre] = useState(docenteContext.nombre);
  const [apellido, setApellido] = useState(docenteContext.apellido);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const docenteData = docenteContext
    ? {
        ...docenteContext,
        email: docenteContext.email,
        modificable: true,
      }
    : null;

  const handleClick = async () => {
    if (!docenteContext?.id) return;

    const updatedData = { nombre, apellido };
    try {
      if (editando) {
        setEditando(!editando);
      } else {
        console.log(docenteContext);
        const updatedDocente = await modificarDocente(
          docenteContext.id,
          updatedData
        );
        setDocenteContext(updatedDocente);
        setEditando(!editando);
        navigate("/");
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al modificar docente";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{ display: "flex", alignItems: "center", my: "2rem" }}
      >
        <Box
          sx={{
            height: "6rem",
            width: "6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            backgroundColor: "#DDF0E7",
            color: "#429870",
            fontSize: "3rem",
            fontWeight: "500",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {docenteData?.nombre?.charAt(0)}
          {docenteData?.apellido?.charAt(0)}
        </Box>

        <Input
          key="nombre"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          titulo="Nombre"
        />

        <Input
          key="apellido"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "auto",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "50%" }}
        >
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      </Snackbar>
    </>
  );
}
