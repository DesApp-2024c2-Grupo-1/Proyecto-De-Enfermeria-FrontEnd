import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import "../index.css";
import { loginDocente } from "../services/DocenteService";
import { useDocente } from "../context/DocenteContext";
import { Stack, Box, Snackbar, Alert, useMediaQuery } from "@mui/material";

export function LoginPage() {
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { setDocenteContext } = useDocente();
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dniError, setDniError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isDesktop = useMediaQuery("(min-width:600px)");

  const handleLogin = async () => {

    setPasswordError(!password.trim() ? "Este campo no puede estar vacío" : "");
    setDniError(!dni.trim() ? "Este campo no puede estar vacío" : "");

    try {
      const docente = await loginDocente(dni, password);
      setDocenteContext(docente);  
      navigate("home");
    } catch (error) {
      setError("Datos incorrectos");
      setOpenSnackbar(true);
    }
  };

  const handleRegister = () => {
    setIsExpanded(true);
    if (isDesktop) {
      setTimeout(() => {
        navigate("register");
      }, 500);
    } else {
      navigate("register");
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
            transition: "width 0.5s ease, height 0.5s ease",
            width: { xs: "100%", sm: "500px" },
            height: { xs: "100%", sm: "800px" },
            "&.expanded": {
              width: { xs: "100%", sm: "600px" },
              height: { xs: "100%", sm: "800px" },
            },
          }}
          spacing={2}
          className={isExpanded ? "expanded" : ""}
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

          <Input
            placeholder={"Ingresar DNI"}
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            icon={"address-card"}
            helperText={dniError || " "}
            helperTextColor="red"
          />
          <Input
            type="password"
            placeholder={"Ingresar Contraseña"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={passwordError || " "}
            helperTextColor="red"
            icon={"key"}
          />
          <button onClick={handleLogin} className="botonClaro">
            Iniciar sesión
          </button>
        {/*
          <a
            href="https://ar.pinterest.com/pin/369084131975098694/"
            target="_blank"
          >
            ¿Olvidaste la contraseña?
          </a>
          */}
          <p>¿No tenés cuenta?</p>
          <button onClick={handleRegister} className="botonClaroInvertido">
            Registrate
          </button>
        </Stack>
      </Stack>

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
