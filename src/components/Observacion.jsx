import { Input } from "../components/Input";
import { TextField } from "@mui/material";

export function Observacion({ disabled, onChange, modificacionPuntaje }) {
  return (
    <div>
      <Input
        titulo="Modificación de puntaje"
        disabled={disabled}
        backgroundColor={"#DDF0E7"}
        value={modificacionPuntaje}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      />
      <h2>Observaciones</h2>
      <TextField
        disabled={disabled}
        multiline
        rows={7}
        placeholder="Escribe tu texto aquí"
        variant="outlined"
        sx={{
          width: "100%",
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
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
