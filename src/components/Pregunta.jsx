import { Stack, Box, useMediaQuery, Paper, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export function Pregunta({ pregunta, puntaje, respuesta, disabled, onChange }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const Opcion = ({ value, label }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid",
        borderColor: disabled ? "#B0B0B0" : "#1A3D2D",
        borderRadius: "100px",
        width: "28px",
        height: "28px",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor:
          respuesta === value
            ? disabled
              ? "#E8E8E8"
              : "#1A3D2D"
            : "transparent",
        color: disabled
          ? "#B0B0B0"
          : respuesta === value
          ? "white"
          : "#1A3D2D",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: !disabled
            ? respuesta === value
              ? "#234637"
              : "#DAF2E3"
            : "transparent",
        },
      }}
      onClick={() => !disabled && onChange(value)}
    >
      {label}
    </Box>
  );

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        my: "1rem",
        pb: "0.8rem",
        borderBottom: "1px solid #1A3D2D",
      }}
    >
      {xs ? (
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "10px",
            pb: "1rem",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#bbe1d0",
              px: "1rem",
              py: "0.5rem",
              borderRadius: "0 10px 10px 0",
              mb: "0.8rem",
            }}
          >
            
              {pregunta}
            
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: "1rem" }}
          >
            
              {puntaje} {puntaje > 1 ? "puntos" : "punto"}
            
            <Stack direction="row" spacing={2}>
              <Opcion value={true} label="✓" />
              <Opcion value={false} label="✗" />
            </Stack>
          </Stack>
        </Paper>
      ) : (
        <>
          <Box sx={{ maxWidth: "60%", textAlign: "justify" }}>
            {pregunta}
          </Box>
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Typography sx={{ minWidth: "40px" }}>{puntaje}</Typography>
            <Opcion value={true} label="✓" />
            <Opcion value={false} label="✗" />
          </Stack>
        </>
      )}
    </Stack>
  );
}
