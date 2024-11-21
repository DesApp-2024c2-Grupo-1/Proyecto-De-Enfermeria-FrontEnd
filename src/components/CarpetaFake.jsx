import { Box, Typography, Paper, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CarpetaFake({ titulo }) {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          paddingTop: "5vh",
          paddingBottom: "5vh",
          width: "15rem",
          backgroundColor: "#daf2e3",
          position: "relative",
          borderRadius: "5px",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* CarpetaPestaña */}
        <Box
          sx={{
            width: "80px",
            height: "20px",
            backgroundColor: "#daf2e3",
            position: "absolute",
            top: "-15px",
            borderBottom: "none",
            borderRadius: "5px 5px 0 0",
          }}
        />
        {/* Contenedor de botones */}
        <IconButton
                onClick={() => navigate("/crearEvaluacion")}
                sx={{ marginLeft: "5.5rem", mt: 1, mb: 1}}
              >
                <i class="fa fa-plus-circle fa-2xl" aria-hidden="true"></i>
              </IconButton>
      </Paper>

      {/* Título */}
      <Typography
        sx={{
          fontSize: "1.3rem",

          margin: "10px 0 0 0",
          textAlign: "center",
          width: "15rem",
        }}
      >
        Crear evaluación
      </Typography>
    </Stack>
  );
}

export default CarpetaFake;