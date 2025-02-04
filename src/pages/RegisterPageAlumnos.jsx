import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { registrarAlumno } from "../services/AlumnoService";
import { Snackbar, Alert } from "@mui/material";

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
      <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil" />
        <div className="recuadroTexto">
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
          <div id="espaciojaja"></div>

          <button onClick={handleRegister} className="botonClaro">
            Registrarse
          </button>
        </div>

        <div>
          <img
            src="/assets/unahur-logo-figma-sf.png"
            className="unahur-logo"
            alt="Logo UNAHUR"
          />
        </div>
      </div>

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
