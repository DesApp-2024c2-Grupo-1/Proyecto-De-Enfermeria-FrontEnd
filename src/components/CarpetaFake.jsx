import { Box, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

function CarpetaFake({ carpetas }) {
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
        onClick={() => navigate("/crearEvaluacion", { state: { carpetas } })}
        sx={{
          position: "relative",
          maxHeight: "6rem", minHeight: "6rem", overflow: "hidden",
          width: "23rem",
          backgroundColor: "#E6F4EC",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "all 0.25s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            backgroundColor: "#DFF3E2",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "linear-gradient(90deg, #1A3D2D, #4CAF50)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#1A3D2D",
            color: "white",
            width: 64,
            height: 64,
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor: "#2E6547",
              transform: "scale(1.08)",
            },
          }}
        >
          <AiOutlinePlus size={32} />
        </Box>
      </Paper>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          marginTop: 1.5,
          textAlign: "center",
          color: "#1A3D2D",
          width: "300px",
        }}
      >
        Crear modelo de evaluación
      </Typography>
    </Stack>
  );
}

export default CarpetaFake;
