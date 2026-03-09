import { Box, Typography, Avatar, Chip, Stack } from "@mui/material";

export default function AlumnoPerfilHeader({
  alumnoNombre,
  alumnoApellido,
  evaluaciones,
}) {
  const iniciales =
    (alumnoNombre?.[0] || "").toUpperCase() +
    (alumnoApellido?.[0] || "").toUpperCase();

  const aprobadas = evaluaciones.filter((e) => {
    const num = parseInt(e.nota?.replace("%", "").trim(), 10);
    return num >= 60;
  }).length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        mt: 1.5,
        mb: 0,
        flexWrap: "wrap",
      }}
    >
      <Avatar
        sx={{
          width: 72,
          height: 72,
          fontSize: 26,
          bgcolor: "#1A3D2D",
          fontWeight: 700,
        }}
      >
        {iniciales}
      </Avatar>

      <Box>
        <Typography variant="h4" fontWeight={700} color="#1A3D2D" lineHeight={1.2}>
          {alumnoNombre} {alumnoApellido}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1.2, flexWrap: "wrap", gap: 1 }}>
          <Chip
            label={`${evaluaciones.length} realizadas`}
            size="small"
            sx={{ backgroundColor: "#d7f0dc", color: "#1A3D2D", fontWeight: 600 }}
          />
          <Chip
            label={`${aprobadas} aprobadas`}
            size="small"
            sx={{ backgroundColor: "#c8e6c9", color: "#1b5e20", fontWeight: 600 }}
          />
          {evaluaciones.length > 0 && (
            <Chip
              label={`${evaluaciones.length - aprobadas} desaprobadas`}
              size="small"
              sx={{ backgroundColor: "#fce4e4", color: "#b71c1c", fontWeight: 600 }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
