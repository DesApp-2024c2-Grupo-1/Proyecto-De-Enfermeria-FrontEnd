import { TextField } from "@mui/material";

export function Input({ disabled, placeholder, texto, titulo, width }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <TextField
        sx={{
          width: width,
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
            "&.Mui-focused": { // Add this to keep the label color when focused
              color: "#429870", // Keep the same color when focused
            },
          },
        }}
        disabled={disabled}
        id={texto}
        label={placeholder}
        variant="outlined"
      />
    </div>
  );
}