import { Stack, Box, useMediaQuery, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export function Pregunta({ pregunta, puntaje, respuesta, disabled, onChange }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  return xs ? (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: "1rem",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#DDF0E7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          paddingBottom: "1rem",
        }}
      >
        <Box
          sx={{
            maxWidth: "70%",
            textAlign: "justify",
            backgroundColor: "#bbe1d0",
            px: "1rem",
            py: "0.1rem",
            my: "1rem",
            borderRadius: "10px",
          }}
        >
          <p>{pregunta}</p>
        </Box>

        <Stack direction={"row"} spacing={2.5}>
          <p style={{ marginRight: 50 }}>{puntaje} {puntaje > 1 ? "puntos" : "punto"}</p>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: disabled ? "#B0B0B0" : "#1A3D2D",
              borderRadius: "100px",
              width: "25px",
              height: "25px",
              textAlign: "center",
              lineHeight: "23px",
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor:
                respuesta === true
                  ? disabled
                    ? "#E8E8E8"
                    : "#1A3D2D"
                  : "transparent",
              color: disabled
                ? "#B0B0B0"
                : respuesta === true
                ? "white"
                : "#1A3D2D",
            }}
          >
            <input
              type="radio"
              id={`si-${pregunta}`}
              name={`respuesta-${pregunta}`}
              value="Si"
              disabled={disabled}
              checked={respuesta === true}
              onChange={() => onChange(true)}
              style={{ display: "none" }}
            />
            <label htmlFor={`si-${pregunta}`}>✓</label>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: disabled ? "#B0B0B0" : "#1A3D2D",
              borderRadius: "100px",
              width: "25px",
              height: "25px",
              textAlign: "center",
              lineHeight: "23px",
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor:
                respuesta === false
                  ? disabled
                    ? "#E8E8E8"
                    : "#1A3D2D"
                  : "transparent",
              color: disabled
                ? "#B0B0B0"
                : respuesta === false
                ? "white"
                : "#1A3D2D",
            }}
          >
            <input
              type="radio"
              id={`no-${pregunta}`}
              name={`respuesta-${pregunta}`}
              value="No"
              disabled={disabled}
              checked={respuesta === false}
              onChange={() => onChange(false)}
              style={{ display: "none" }}
            />
            <label htmlFor={`no-${pregunta}`}>✗</label>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  ) : (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: "1rem",
        borderBottom: "1px solid #1A3D2D",
      }}
    >
      <Box sx={{ maxWidth: "60%", textAlign: "justify" }}>
        <p>{pregunta}</p>
      </Box>

      <Stack direction={"row"} spacing={2.5}>
        <p style={{ marginRight: 50 }}>{puntaje}</p>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid",
            borderColor: disabled ? "#B0B0B0" : "#1A3D2D",
            borderRadius: "100px",
            width: "25px",
            height: "25px",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "default",
            backgroundColor:
              respuesta === true
                ? disabled
                  ? "#E8E8E8"
                  : "#1A3D2D"
                : "transparent",
            color: disabled
              ? "#B0B0B0"
              : respuesta === true
              ? "white"
              : "#1A3D2D",
          }}
        >
          <input
            type="radio"
            id={`si-${pregunta}`}
            name={`respuesta-${pregunta}`}
            value="Si"
            disabled={disabled}
            checked={respuesta === true}
            onChange={() => onChange(true)}
            style={{ display: "none" }}
          />
          <label htmlFor={`si-${pregunta}`}>✓</label>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid",
            borderColor: disabled ? "#B0B0B0" : "#1A3D2D",
            borderRadius: "100px",
            width: "25px",
            height: "25px",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "default",
            backgroundColor:
              respuesta === false
                ? disabled
                  ? "#E8E8E8"
                  : "#1A3D2D"
                : "transparent",
            color: disabled
              ? "#B0B0B0"
              : respuesta === false
              ? "white"
              : "#1A3D2D",
          }}
        >
          <input
            type="radio"
            id={`no-${pregunta}`}
            name={`respuesta-${pregunta}`}
            value="No"
            disabled={disabled}
            checked={respuesta === false}
            onChange={() => onChange(false)}
            style={{ display: "none" }}
          />
          <label htmlFor={`no-${pregunta}`}>✗</label>
        </Box>
      </Stack>
    </Stack>
  );
}
