import { Box, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Carpeta({ titulo, id }) {
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
        <Stack
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "10px",
          }}
        >
          <button
            className="botonClaro"
            onClick={() => navigate(`/registrarEvaluacion/${id}`)}
            style={{ borderRadius: 5 }}
          >
            Evaluar
          </button>
          <button
            className="botonClaro"
            onClick={() => navigate(`/registroEvaluaciones`)}
            style={{ borderRadius: 5 }}
          >
            Ver
          </button>
        </Stack>
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
        {titulo}
      </Typography>
    </Stack>
  );
}

export default Carpeta;

/*


*/
