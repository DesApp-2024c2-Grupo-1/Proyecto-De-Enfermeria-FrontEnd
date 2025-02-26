import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarDocente } from "../services/DocenteService";
import { Stack, Box, Snackbar, Grid, Alert } from "@mui/material";
import { Input } from "../components/Input";
import "../index.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = async () => {
    let errorList = [];

    if (password !== confirmarPassword) {
      errorList.push("Las contraseñas no coinciden");
    }

    if (errorList.length > 0) {
      setError(errorList);
      setOpenSnackbar(true);
      return;
    }

    setError([]);

    const docenteData = { nombre, apellido, email, dni: Number(dni), password };

    try {
      await registrarDocente(docenteData);
      /*console.log("Registro exitoso, navegando...");*/
      navigate("/registroDocenteExitoso");
    } catch (error) {
      /*console.log(error.response?.data?.message);*/
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
          height: "100vh",
        }}
      >
        <Stack
          className="stack-animacion stack-target"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
            width: { sx: "100%", sm: "600px" },
            height: { sx: "100%", sm: "700px" },
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
            <Grid item xs={12} sm={5.86}>
              <Input
                type="password"
                placeholder={"Ingrese su contraseña"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={"key"}
              />
            </Grid>
            <Grid item xs={12} sm={5.86}>
              <Input
                type="password"
                placeholder={"Repita su contraseña"}
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                icon={"key"}
              />
            </Grid>
          </Grid>

          <button onClick={handleRegister} className="botonClaro">
            Registrarme
          </button>
        </Stack>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          width: { xs: "100%", md: "75%", lg: "61%" },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "60%" }}
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
