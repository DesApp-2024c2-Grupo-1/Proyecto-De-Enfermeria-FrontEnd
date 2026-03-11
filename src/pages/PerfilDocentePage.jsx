import { useState } from "react";
import {
  Button,
  Box,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
  Avatar,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useDocente } from "../context/DocenteContext";
import { modificarDocente } from "../services/DocenteService";
import { useNavigate } from "react-router-dom";
import { autenticacion } from "../components/HandlerNecesidadAuth";

const fieldSx = (disabled) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: disabled ? "#f5faf7" : "#fff",
    "& fieldset": { borderColor: "#e8f1ec" },
    "&:hover fieldset": { borderColor: disabled ? "#e8f1ec" : "#5a9e7c" },
    "&.Mui-focused fieldset": { borderColor: "#1A3D2D" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#1A3D2D" },
});

const PerfilDocentePage = () => {
  const [editando, setEditando] = useState(true);
  const { docenteContext, setDocenteContext } = useDocente();
  const [nombre, setNombre] = useState(docenteContext.nombre);
  const [apellido, setApellido] = useState(docenteContext.apellido);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [error, setError] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const xs = useMediaQuery("(max-width:600px)");

  const iniciales =
    (docenteContext?.nombre?.[0] || "").toUpperCase() +
    (docenteContext?.apellido?.[0] || "").toUpperCase();

  const handleCerrarSesion = () => {
    setDocenteContext(null);
    navigate("/");
  };

  const handleClick = async () => {
    if (!docenteContext?.id) return;

    const capitalizar = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    if (editando) {
      setEditando(false);
      return;
    }

    try {
      const updatedDocente = await modificarDocente(docenteContext.id, {
        nombre: capitalizar(nombre),
        apellido: capitalizar(apellido),
      });
      setDocenteContext(updatedDocente);
      setEditando(true);
      setOpenSuccessSnackbar(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      const mensajeError =
        err.response?.data?.message || "Error al modificar docente.";
      setError(Array.isArray(mensajeError) ? mensajeError : [mensajeError]);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: { xs: 4, sm: 5 },
          pb: { xs: 3, sm: 4 },
          borderBottom: "1px solid #e8f1ec",
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "#5a9e7c", fontWeight: 600, letterSpacing: "0.12em" }}
        >
          Cuenta
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mt: 1.5, flexWrap: "wrap" }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              fontSize: 26,
              bgcolor: "#1A3D2D",
              fontWeight: 700,
            }}
          >
            {iniciales}
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1A3D2D", lineHeight: 1.2 }}
            >
              {docenteContext?.nombre} {docenteContext?.apellido}
            </Typography>
            <Chip
              label="Docente"
              size="small"
              sx={{ mt: 1, backgroundColor: "#d7f0dc", color: "#1A3D2D", fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Form */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: 4,
          pb: 8,
          maxWidth: 640,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} color="#1A3D2D" mb={3}>
          {editando ? "Información personal" : "Editando información"}
        </Typography>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} color="#5a9e7c" mb={0.75}>
                Nombre
              </Typography>
              <TextField
                fullWidth
                size="small"
                disabled={editando}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                sx={fieldSx(editando)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} color="#5a9e7c" mb={0.75}>
                Apellido
              </Typography>
              <TextField
                fullWidth
                size="small"
                disabled={editando}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                sx={fieldSx(editando)}
              />
            </Box>
          </Stack>

          <Box>
            <Typography variant="body2" fontWeight={600} color="#5a9e7c" mb={0.75}>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              disabled
              value={docenteContext?.email || ""}
              sx={fieldSx(true)}
            />
          </Box>

          <Stack direction="row" spacing={2} pt={1}>
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor: "#1A3D2D",
                color: "#fff",
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "#15312400", color: "#1A3D2D", boxShadow: "none" },
                boxShadow: "none",
              }}
            >
              {editando ? "Editar" : "Guardar cambios"}
            </Button>

            {!editando && (
              <Button
                variant="outlined"
                onClick={() => { setEditando(true); setNombre(docenteContext.nombre); setApellido(docenteContext.apellido); }}
                sx={{
                  borderColor: "#e8f1ec",
                  color: "#555",
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": { borderColor: "#5a9e7c", backgroundColor: "transparent" },
                }}
              >
                Cancelar
              </Button>
            )}

            {xs && editando && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenDialog(true)}
                sx={{ borderRadius: 2, fontWeight: 600 }}
              >
                Cerrar sesión
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Logout confirmation dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { borderRadius: 3, px: 3, py: 2, minWidth: 280 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#1A3D2D", pb: 1 }}>
          ¿Cerrar sesión?
        </DialogTitle>
        <DialogActions sx={{ pb: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            sx={{
              borderColor: "#e8f1ec",
              color: "#555",
              borderRadius: 2,
              "&:hover": { borderColor: "#5a9e7c", backgroundColor: "transparent" },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleCerrarSesion}
            sx={{
              backgroundColor: "#1A3D2D",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#15312400", color: "#1A3D2D", boxShadow: "none" },
              boxShadow: "none",
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {error.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </Alert>
      </Snackbar>

      {/* Success snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          ¡Datos actualizados correctamente! Redirigiendo...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default autenticacion(PerfilDocentePage);