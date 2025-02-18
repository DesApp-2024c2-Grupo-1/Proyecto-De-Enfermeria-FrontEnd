import { Stack, Box } from "@mui/material";

export function Pregunta({ pregunta, puntaje, respuesta, disabled, onChange }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: "1rem",
        borderBottom: "1px solid black",
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
            borderColor: disabled ? "#B0B0B0" : "black",
            borderRadius: "100px",
            width: "25px",
            height: "25px",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: respuesta === true ? (disabled ? "#E8E8E8" : "black") : "transparent",
            color: disabled ? "#B0B0B0" : (respuesta === true ? "white" : "black"),
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
            borderColor: disabled ? "#B0B0B0" : "black",
            borderRadius: "100px",
            width: "25px",
            height: "25px",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: respuesta === false ? (disabled ? "#E8E8E8" : "black") : "transparent",
            color: disabled ? "#B0B0B0" : (respuesta === false ? "white" : "black"),
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
