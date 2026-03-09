import { useState } from "react";
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
  const [dniError, setDniError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isDesktop = useMediaQuery("(min-width:600px)");

  const handleLogin = async () => {
    setPasswordError(!password.trim() ? "Este campo no puede estar vacio" : "");
    setDniError(!dni.trim() ? "Este campo no puede estar vacio" : "");

    if (!dni.trim() || !password.trim()) {
      return;
    }

    try {
      const docente = await loginDocente(dni, password);
      setDocenteContext(docente);
      navigate("home");
    } catch (_error) {
      setError("Datos incorrectos");
      setOpenSnackbar(true);
    }
  };

  const handleRegister = () => {
    navigate("register");
  };

  return (
    <>
      <Stack
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
          backgroundColor: "#eef6f1",
        }}
      >
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              flex: 1,
              p: { xs: 4, md: 7 },
              justifyContent: "center",
              alignItems: { xs: "center", sm: "center" },
              backgroundColor: "#eef6f1",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "380px" }}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    fontSize: "0.82rem",
                    letterSpacing: "0.14em",
                    color: "#3f7e62",
                    fontWeight: 600,
                  }}
                >
                  REE - PPS
                </Box>
                <Box
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.1rem" },
                    fontWeight: 700,
                    color: "#16382a",
                    lineHeight: 1.2,
                    mt: 1,
                  }}
                >
                  Iniciar sesion
                </Box>
              </Box>

              <Input
                width="100%"
                placeholder={"Ingresar DNI"}
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                icon={"address-card"}
                helperText={dniError || " "}
                helperTextColor="red"
              />
              <Input
                width="100%"
                type="password"
                placeholder={"Ingresar Contrasena"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={passwordError || " "}
                helperTextColor="red"
                icon={"key"}
              />

              <button
                onClick={handleLogin}
                className="botonClaro"
                style={{ width: "100%", marginTop: "6px" }}
              >
                Iniciar sesion
              </button>

              <Stack
                direction={isDesktop ? "row" : "column"}
                spacing={1}
                sx={{ mt: 1.7, alignItems: "center" }}
              >
                <p style={{ margin: 0, color: "#254b3a" }}>No tenes cuenta?</p>
                <button
                  onClick={handleRegister}
                  className="botonClaroInvertido"
                  style={{ width: isDesktop ? "9rem" : "100%" }}
                >
                  Registrate
                </button>
              </Stack>
            </Box>
          </Stack>

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              zIndex: 2,
              left: "50%",
              top: 0,
              width: "170px",
              height: "100%",
              backgroundColor: "#d8e9df",
              transform: "translateX(-50%) skewX(-12deg)",
              transformOrigin: "center",
              pointerEvents: "none",
            }}
          />

          <Stack
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              p: { xs: 3.5, md: 6 },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#dcebe2",
            }}
          >
            <Box
              component="img"
              src="../assets/logoConFondoClaro.png"
              alt="Logo REE PPS"
              sx={{
                width: { xs: "180px", sm: "220px", md: "250px" },
                maxWidth: "100%",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.12))",
              }}
            />
            <Box
              sx={{
                mt: 2,
                color: "#2d5b47",
                fontWeight: 600,
                textAlign: "center",
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              Registro de Evaluaciones de Enfermeria
            </Box>
          </Stack>
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
