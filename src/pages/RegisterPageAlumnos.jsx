import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarAlumno } from "../services/AlumnoService";
import { Stack, Box, Snackbar, Grid, Alert, Button } from "@mui/material";
import { Input } from "../components/Input";

export function RegisterPageAlumnos() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = async () => {
    const alumnoData = { nombre, apellido, email, dni: Number(dni) };

    try {
      await registrarAlumno(alumnoData);
      navigate("/registroAlumnoExitoso");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al registrar docente";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
          overflow: "hidden",
        }}
      >
        <Stack
          className="stack-animacion stack-target"
          sx={{
            height: "500px",
            width: "600px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.87)",
            borderRadius: "20px",
          }}
          spacing={2}
        >
          <Box
            sx={{
              width: "130px",
              height: "130px",
              backgroundColor: "#429870",
              borderRadius: "50%",
              zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
              color: "rgba(255, 255, 255, 0.87)",
            }}
          >
            <i className="fa fa-user" style={{ fontSize: "60px" }}></i>
          </Box>

          <Grid container spacing={1.65} sx={{ width: "80%" }}>
            <Grid item xs={12} sm={5.86}>
              <Input
                placeholder={"Ingrese su nombre"}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                icon={"user"}
              />
            </Grid>
            <Grid item xs={12} sm={5.86}>
              <Input
                placeholder={"Ingrese su apellido"}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                icon={"user"}
              />
            </Grid>
            <Grid item xs={12} sm={5.86}>
              <Input
                placeholder={"Ingrese su DNI"}
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                icon={"id-card"}
              />
            </Grid>
            <Grid item xs={12} sm={5.86}>
              <Input
                type="email"
                placeholder={"Ingrese su email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={"envelope"}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              background: "#2E7D5D",
              color: "white",
              borderRadius: "10px",
              maxWidth: 150,
              minWidth: 150,
              marginLeft: 1,
              px: 3,
              py: 1.2,
              "&:hover": {
                background: "#275B43",
              },
            }}
          >
            Registrar
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          width: "100%",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
