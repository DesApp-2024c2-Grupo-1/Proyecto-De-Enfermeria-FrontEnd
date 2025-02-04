import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../index.css";
import { getDocenteByDni } from "../services/DocenteService";
import { useDocente } from "../context/DocenteContext";
import { Snackbar, Alert } from "@mui/material";

export function LoginPage() {
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { setDocenteContext } = useDocente();
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [docente, setDocente] = useState(null);

  const fetchDocente = async (dni) => {
    const data = await getDocenteByDni(Number(dni));
    setDocente(data);
  };

  useEffect(() => {
    fetchDocente(dni);
  }, [dni]);

  const handleLogin = async () => {
    if (!docente) {
      setError("Datos incorrectos");
      setOpenSnackbar(true);
    } else if (password === docente.password) {
      setDocenteContext(docente);
      navigate("home");
    } else {
      setError("Datos incorrectos");
      setOpenSnackbar(true);
    }
  };

  const handleRegister = () => {
    navigate("register");
  };

  return (
    <>
      <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil" />
        <div className="recuadroTexto">
          <FormInput
            placeholder="Ingrese su DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="recuadroInputs"
            icono="address-card"
          />
          <FormInput
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="recuadroInputs"
            icono="lock"
          />

          <button onClick={handleLogin} className="botonClaro">
            Iniciar sesión
          </button>

          <div className="alineacion-texto">
            <p className="texto">
              <a
                className="texto"
                href="https://ar.pinterest.com/pin/369084131975098694/"
                target="_blank"
              >
                ¿Olvidaste la contraseña?
              </a>
            </p>
            <p id="espacio">¿No tenés cuenta?</p>
            <button onClick={handleRegister} className="botonClaro">
              Registrate
            </button>
          </div>
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
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          width: { xs: "100%", sm: "75%", md: "50%" },
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
            <li>{error}</li>
          </ul>
        </Alert>
      </Snackbar>
    </>
  );
}
