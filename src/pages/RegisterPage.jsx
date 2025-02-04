import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { registrarDocente } from "../services/DocenteService";
import { Snackbar, Alert } from "@mui/material";

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

    // Verificar si las contraseñas coinciden
    if (password !== confirmarPassword) {
      errorList.push("Las contraseñas no coinciden");
    }

    if (errorList.length > 0) {
      setError(errorList);
      setOpenSnackbar(true);
    }

    setError([]);

    const docenteData = { nombre, apellido, email, dni: Number(dni), password };

    try {
      await registrarDocente(docenteData);
      navigate("/registroDocenteExitoso");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al registrar docente";
      setError(mensajeError);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil" />
        <div className="recuadroTexto2">
          <FormInput
            type="name"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="recuadroInputs"
            icono="user"
          />
          <FormInput
            type="apellido"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="recuadroInputs"
            icono="user"
          />
          <FormInput
            type="dni"
            placeholder="Ingrese su DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="recuadroInputs"
            icono="address-card"
          />
          <FormInput
            type="email"
            placeholder="nombre@apellido.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="recuadroInputs"
            icono="envelope"
          />
          <FormInput
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="recuadroInputs"
            icono="lock"
          />
          <FormInput
            type="password"
            placeholder="Repita su contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            className="recuadroInputs"
            icono="lock"
          />
          <div id="espaciojaja"></div>

          <button onClick={handleRegister} className="botonClaro">
            Registrate
          </button>
        </div>
        <div>
          <img
            src="../assets/unahur-logo-figma-sf.png"
            className="unahur-logo"
            alt="Logo UNAHUR"
          />
        </div>
      </div>

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
