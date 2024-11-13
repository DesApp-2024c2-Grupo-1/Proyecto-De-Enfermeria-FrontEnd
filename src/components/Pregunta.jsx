import { Stack, Box } from "@mui/material";

export function Pregunta({ pregunta, respuesta, disabled, onChange }) {
  return (
    <Stack

      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: "1rem",
      }}
    >
      <Box sx={{ maxWidth: "60%", textAlign: "center" /* backgroundColor: "green" */}}>
        <p>{pregunta}</p> 
      </Box>
      <Stack direction={"row"} spacing={2.5} sx={{/*backgroundColor: "yellow" */}}>
        <input
          type="radio"
          id={`si-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="Si"
          disabled={disabled}
          checked={respuesta === true}
          onChange={() => onChange(true)}
        />
        <label htmlFor={`si-${pregunta}`}> Si </label>

        <input
          type="radio"
          id={`no-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="No"
          disabled={disabled}
          checked={respuesta === false}
          onChange={() => onChange(false)}
        />
        <label htmlFor={`no-${pregunta}`}> No </label>
      </Stack>
    </Stack>
  );
}
