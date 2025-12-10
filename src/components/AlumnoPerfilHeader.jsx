import { Box, Typography, Avatar } from "@mui/material";

export default function AlumnoPerfilHeader({
  alumnoNombre,
  alumnoApellido,
  evaluaciones,
}) {
  const iniciales =
    (alumnoNombre?.[0] || "").toUpperCase() +
    (alumnoApellido?.[0] || "").toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        my: 8,
        flexWrap: "wrap",
        width: "100%",
        maxWidth: "900px",
      }}
    >
      <Avatar sx={{ width: 90, height: 90, fontSize: 32, bgcolor: "#1A3D2D" }}>
        {iniciales}
      </Avatar>

      <Box>
        <Typography
          sx={{ fontFamily: "Poppins, Inter, sans-serif" }}
          variant="h4"
          fontWeight={700}
          color="black"
        >
          {alumnoNombre} {alumnoApellido}
        </Typography>

        <Typography
          sx={{ fontFamily: "Poppins, Inter, sans-serif" }}
          mt={2}
          fontWeight={500}
        >
          Cantidad de evaluaciones realizadas: {evaluaciones.length}
        </Typography>

        <Typography
          sx={{ fontFamily: "Poppins, Inter, sans-serif" }}
          fontWeight={500}
        >
          Cantidad de evaluaciones aprobadas:{" "}
          {
            evaluaciones.filter((e) => {
              const num = parseInt(e.nota.replace("%", "").trim(), 10);
              return num >= 60;
            }).length
          }
        </Typography>
      </Box>
    </Box>
  );
}
