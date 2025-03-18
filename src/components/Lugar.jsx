import { Stack, Box } from "@mui/material";

export function Lugar({ disabled, selected, onChange }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "60%",
          textAlign: "center" /* backgroundColor: "green" */,
        }}
      >
        <p>¿Dónde fue realizada esta práctica?</p>
      </Box>
      <Stack
        direction={"row"}
        spacing={5}
        sx={
          {
            /*backgroundColor: "yellow" */
          }
        }
      >
        <div>
          <input
            disabled={disabled}
            type="radio"
            id="1"
            name="lugar"
            checked={selected === "1"}
            value="Campo Practico"
            onChange={onChange ? () => onChange("1") : null}
          />
          <label htmlFor="1"> Campo Practico</label>
        </div>
        <div>
          <input
            disabled={disabled}
            type="radio"
            id="2"
            name="lugar"
            checked={selected === "2"}
            value="Centro de Simulación"
            onChange={onChange ? () => onChange("2") : null}
          />
          <label htmlFor="2"> Centro de Simulación</label>
        </div>
      </Stack>
    </Stack>
  );
}
