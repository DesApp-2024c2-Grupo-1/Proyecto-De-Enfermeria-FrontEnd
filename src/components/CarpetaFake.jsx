import { Box, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

function CarpetaFake({ titulo, carpetas }) {
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
          borderRadius: "10px",
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
        <Box
          onClick={() => navigate("/crearEvaluacion", { state: { carpetas } })}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            my: 2.5,
          }}
        >
          <AiFillPlusCircle size="40" color="#275B43" />
        </Box>
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
