import { useState } from "react";
import { Input } from "../components/Input";
import {
  Button,
  Box,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
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
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const docenteData = docenteContext
    ? {
        ...docenteContext,
        email: docenteContext.email,
        modificable: true,
      }
    : null;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCerrarSesion = () => {
    setDocenteContext(null);
    navigate("/");
  }

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
        error.response?.data?.message || "Error al modificar docente.";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
    <Stack
        direction="column"
        spacing={2}
        sx={{ display: "flex", alignItems: "center", my: "2rem"  }}
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
          width= {xs ? "17rem" : "25rem"}
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          titulo="Nombre"
        />

        <Input
          key="apellido"
          width={xs ? "17rem" : "25rem"}
          backgroundColor={"#DDF0E7"}
          disabled={editando}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          titulo="Apellido"
        />

        <Input
          width={xs ? "17rem" : "25rem"}
          backgroundColor={"#DDF0E7"}
          key="email"
          disabled={true}
          placeholder={docenteContext?.email || "Email no definido"}
          titulo="Email"
        />

        <button
          style={{ width: "15rem" }}
          className="botonVerde"
          onClick={handleClick}
        >
          {editando ? "Editar" : "Guardar"}
        </button>
        <Button
          sx={{
            width: "15rem",
            borderRadius: "100px",
            fontWeight: "600",
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          }}
          variant="outlined"
          color="error"
          onClick={handleOpenDialog}
        >
          Cerrar Sesión
        </Button>
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{

          "& .MuiDialog-paper": { padding: "2rem" },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"¿Cerrar sesión?"}</DialogTitle>

        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleCerrarSesion} autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

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
