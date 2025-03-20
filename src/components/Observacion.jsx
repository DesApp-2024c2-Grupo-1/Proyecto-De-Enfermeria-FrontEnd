import { Input } from "../components/Input";
import { TextField } from "@mui/material";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";

const theme = createMuiTheme({
  palette: {
    text: {
      disabled: 'dark-grey'
    }
  },
});


export function Observacion({
  disabled,
  onObservacionChange,
  onPuntajeChange,
  modificacionPuntajeValue,
  observacionValue,
}) {

  

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Input
        titulo="Modificación de puntaje"
        disabled={disabled}
        backgroundColor={"#DDF0E7"}
        
        placeholder={
          disabled ? modificacionPuntajeValue : "Escribe un número aquí..."
        }
        onChange={(e) => onPuntajeChange(parseInt(e.target.value) || 0)}
      />
      <h2>Observaciones</h2>
      <TextField
        disabled={disabled}
        multiline
        rows={7}
        placeholder={disabled ? observacionValue : "Escribe tu texto aquí..."}
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
          "& .Mui-disabled": {
            "& input::placeholder, & textarea::placeholder": {
              color: "dark-grey",
              opacity: 1,
            },
          },
        }}
        onChange={(e) => onObservacionChange(e.target.value)}
      />
    </div>
    </ThemeProvider>
  );
}
