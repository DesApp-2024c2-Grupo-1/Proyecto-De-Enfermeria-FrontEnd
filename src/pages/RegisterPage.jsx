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

  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [dniError, setDniError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmarPasswordError, setConfirmarPasswordError] = useState("");



  const handleRegister = async () => {
    const capitalizar = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

     let errorList = [];

  setNombreError("");
  setApellidoError("");
  setEmailError("");
  setPasswordError("");
  setConfirmarPasswordError("");
  setDniError("");

  if (!nombre.trim()) {
    setNombreError("Este campo no puede estar vacío");
    errorList.push("El nombre no puede estar vacío");
  } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    setNombreError("El nombre solo puede contener letras y espacios");
    errorList.push("Nombre inválido");
  }

  if (!apellido.trim()) {
    setApellidoError("Este campo no puede estar vacío");
    errorList.push("El apellido no puede estar vacío");
  } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
    setApellidoError("El apellido solo puede contener letras y espacios");
    errorList.push("Apellido inválido");
  }

  if (!dni.trim()) {
    setDniError("Este campo no puede estar vacío");
    errorList.push("El DNI no puede estar vacío");
  } else if (!/^\d{7,8}$/.test(dni)) {
    setDniError("DNI inválido (7 u 8 dígitos)");
    errorList.push("DNI inválido");
  }

  if (!email.trim()) {
    setEmailError("Este campo no puede estar vacío");
    errorList.push("El email no puede estar vacío");
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setEmailError("Formato de email inválido");
    errorList.push("Email inválido");
  }

  if (!password.trim()) {
    setPasswordError("Este campo no puede estar vacío");
    errorList.push("La contraseña no puede estar vacía");
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    setPasswordError("Debe tener al menos 8 caracteres, una letra y un número");
    errorList.push("Contraseña insegura");
  }

  if (!confirmarPassword.trim()) {
    setConfirmarPasswordError("Este campo no puede estar vacío");
    errorList.push("Debe confirmar la contraseña");
  } else if (password !== confirmarPassword) {
    setConfirmarPasswordError("Las contraseñas no coinciden");
    errorList.push("Las contraseñas no coinciden");
  }

  if (errorList.length > 0) {
    setError(errorList);
    return;
  }

    const docenteData = { nombre: capitalizar(nombre), apellido: capitalizar(apellido), email, dni: Number(dni), password };

    try {
      await registrarDocente(docenteData);
      /*console.log("Registro exitoso, navegando...");*/
      navigate("/registroDocenteExitoso");
    } catch (error) {
      console.log(error.response?.data?.message);
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
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.87)",
            borderRadius: { xs: "0px", sm: "20px" },
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
            width: { xs: "100%", sm: "600px" },
            height: { xs: "100%", sm: "800px" },
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
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
              color: "rgba(255, 255, 255, 0.87)",
            }}
          >
            <i className="fa fa-user" style={{ fontSize: "60px" }}></i>
          </Box>

          <Grid container sx={{ width: "80%" }}>
            <Grid item xs={12} sm={5.8}>
              <Input
                placeholder={"Ingrese su nombre"}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                icon={"user"}
                width={"100%"}
                helperText={nombreError || " "}
                helperTextColor="red"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} sx={{ marginLeft: "auto" }}>
              <Input
                placeholder={"Ingrese su apellido"}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                icon={"user"}
                width={"100%"}
                helperText={apellidoError || " "}
                helperTextColor="red"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                placeholder={"Ingrese su DNI"}
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                icon={"id-card"}
                width={"100%"}
                helperText={dniError || " "}
                helperTextColor="red"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                type="email"
                placeholder={"Ingrese su email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={"envelope"}
                width={"100%"}
                helperText={emailError || " "}
                helperTextColor="red"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                type="password"
                placeholder={"Ingrese su contraseña"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={"key"}
                width={"100%"}
                helperText={passwordError || " "}
                helperTextColor="red"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                type="password"
                placeholder={"Repita su contraseña"}
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                icon={"key"}
                width={"100%"}
                helperText={confirmarPasswordError || " "}
                helperTextColor="red"
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
