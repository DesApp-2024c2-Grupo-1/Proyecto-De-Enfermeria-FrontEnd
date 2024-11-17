import { Input } from "../components/Input";
import { TextField } from "@mui/material";

export function Observacion({
}) {
  return (
    <div>
    <h2>Observaciones</h2>
    <TextField
        multiline
        rows={7}
        placeholder="Escribe tu texto aquí"
        variant="outlined"
        sx={{
          width: "800px",
          backgroundColor: "#DDF0E7",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#429870",
            },
            "&:hover fieldset": {
              borderColor: "#429870",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#429870",
            },
            
          },
          "& .MuiInputLabel-root": {
            color: "#429870",
            "&.Mui-focused": {
              color: "#429870",
            },
          },
        }}
      />
    <Input
              width="3rem"
              titulo="Modificación de puntaje"
            />
    </div>
  );
}