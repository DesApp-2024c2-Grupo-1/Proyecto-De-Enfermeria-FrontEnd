import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function RegistrarEvaluacionExitoPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <h2 style={{ textAlign: "center", marginTop: "7vh" }}>
        Evaluación
      </h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 3,
            borderRadius: 7,
            backgroundColor: "#DDF0E7",
          }}
        >
          <h1>¡La evaluación fue registrada con éxito!</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3,
              gap: 2,
            }}
          >
            <button
              onClick={() => navigate("/home")}
              className="botonClaro"
              style={{ borderRadius: 8 }}
            >
              Ir al inicio
            </button>
            <button
              onClick={() => navigate(-1)}
              className="botonClaro"
              style={{ borderRadius: 8 }}
            >
              Evaluar nuevamente
            </button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
